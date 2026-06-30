import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "@/api/api";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Swal from "sweetalert2";

interface StudentExamStatus {
  patientId: number;
  fullName: string;
  code: string;
  schoolClass: string;
  phoneNumber: string;
  examId?: number;
  examDate?: string;
  status: string;
}

const ExamTracking = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null);
  const [students, setStudents] = useState<StudentExamStatus[]>([]);
  const [dentists, setDentists] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [notifying, setNotifying] = useState(false);
  const [filterStatus, setFilterStatus] = useState<"ALL" | "EXAMINED" | "NOT_EXAMINED">("ALL");

  useEffect(() => {
    api.get("/api/exam-campaigns").then(res => {
      setCampaigns(res.data);
      if (res.data.length > 0) {
        setSelectedCampaignId(res.data[0].id);
      }
    }).catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedCampaignId) return;
    setLoading(true);
    
    Promise.all([
      api.get(`/api/exam-campaigns/${selectedCampaignId}/students`),
      api.get(`/api/exam-campaigns/${selectedCampaignId}/schedules`)
    ])
      .then(([studentsRes, schedulesRes]) => {
        setStudents(studentsRes.data);
        
        const allDentists = new Set<string>();
        schedulesRes.data.forEach((schedule: any) => {
          if (schedule.dentistNames && Array.isArray(schedule.dentistNames)) {
            schedule.dentistNames.forEach((name: string) => allDentists.add(name));
          }
        });
        setDentists(Array.from(allDentists));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedCampaignId]);

  const notifyDentists = async () => {
    if (!selectedCampaignId) return;
    setNotifying(true);
    try {
      await api.post(`/api/exam-campaigns/${selectedCampaignId}/notify`);
      Swal.fire(
        "Thành công",
        `Đã gửi thông báo cho bác sĩ của đợt khám`,
        "success"
      );
    } catch (e) {
      Swal.fire("Lỗi", "Không thể gửi thông báo", "error");
    } finally {
      setNotifying(false);
    }
  };

  const filteredStudents = students.filter(s =>
    filterStatus === "ALL" ? true : s.status === filterStatus
  );

  const examinedCount = students.filter(s => s.status === "EXAMINED").length;
  const notExaminedCount = students.filter(s => s.status === "NOT_EXAMINED").length;

  const selectedCampaign = campaigns.find(c => c.id === selectedCampaignId);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Theo dõi trạng thái khám</h1>

      {/* Campaign selector */}
      <div className="mb-4 flex flex-col gap-3">
        <div className="flex gap-3 items-center">
          <label className="font-medium text-sm text-gray-700">Chọn đợt khám:</label>
          <select
            className="border rounded px-3 py-2 text-sm"
            value={selectedCampaignId ?? ""}
            onChange={e => setSelectedCampaignId(Number(e.target.value))}
          >
            {campaigns.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          {selectedCampaign && (
            <span className="text-xs text-gray-500">
              {selectedCampaign.startDate} → {selectedCampaign.endDate}
            </span>
          )}
        </div>
        
        {/* Dentists list */}
        {dentists.length > 0 && (
          <div className="flex gap-2 items-center text-sm text-gray-600">
            <span className="font-medium">Bác sĩ phụ trách:</span>
            <div className="flex gap-2 flex-wrap">
              {dentists.map((dentist, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full text-xs font-medium border border-blue-200">
                  {dentist}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white border rounded p-4 text-center shadow-sm">
          <p className="text-3xl font-bold text-gray-800">{students.length}</p>
          <p className="text-sm text-gray-500">Tổng học sinh</p>
        </div>
        <div className="bg-white border rounded p-4 text-center shadow-sm border-l-4 border-green-500">
          <p className="text-3xl font-bold text-green-600">{examinedCount}</p>
          <p className="text-sm text-gray-500">Đã khám</p>
        </div>
        <div className="bg-white border rounded p-4 text-center shadow-sm border-l-4 border-red-400">
          <p className="text-3xl font-bold text-red-500">{notExaminedCount}</p>
          <p className="text-sm text-gray-500">Chưa khám</p>
        </div>
      </div>

      {/* Filters + Actions */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex gap-2">
          {(["ALL", "EXAMINED", "NOT_EXAMINED"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilterStatus(f)}
              className={`px-3 py-1 rounded text-sm font-medium ${
                filterStatus === f
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {f === "ALL" ? "Tất cả" : f === "EXAMINED" ? "Đã khám" : "Chưa khám"}
            </button>
          ))}
        </div>
        <Button
          onClick={notifyDentists}
          isDisabled={notifying || notExaminedCount === 0}
          className="bg-green-600 hover:bg-green-700"
        >
          {notifying ? "Đang gửi..." : `Gửi thông báo cho bác sĩ`}
        </Button>
      </div>

      {loading ? (
        <p className="text-center py-8 text-gray-500">Đang tải...</p>
      ) : (
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="border-b px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">STT</th>
                <th className="border-b px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Mã HS</th>
                <th className="border-b px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Họ tên</th>
                <th className="border-b px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Lớp</th>
                <th className="border-b px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">SĐT</th>
                <th className="border-b px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStudents.map((s, idx) => (
                <tr key={s.patientId} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-500">{idx + 1}</td>
                  <td className="px-4 py-3 text-sm font-mono">{s.code}</td>
                  <td className="px-4 py-3 text-sm font-medium">{s.fullName}</td>
                  <td className="px-4 py-3 text-sm">{s.schoolClass}</td>
                  <td className="px-4 py-3 text-sm">{s.phoneNumber}</td>
                  <td className="px-4 py-3">
                    {s.status === "EXAMINED" ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ✓ Đã khám
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        ✗ Chưa khám
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-400">Không có dữ liệu</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExamTracking;
