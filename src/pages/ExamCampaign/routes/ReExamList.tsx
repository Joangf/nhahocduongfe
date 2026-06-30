import React, { useEffect, useState } from "react";
import { api } from "@/api/api";

const ReExamList = () => {
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get("/api/exams/re-exams")
      .then(res => setExams(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quản lý lịch tái khám</h1>

      {loading ? (
        <p className="text-center py-8 text-gray-500">Đang tải...</p>
      ) : (
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="border-b px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">STT</th>
                <th className="border-b px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Họ tên</th>
                <th className="border-b px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Lớp</th>
                <th className="border-b px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Ngày khám</th>
                <th className="border-b px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Ngày tái khám</th>
                <th className="border-b px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Ghi chú</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {exams.map((e, idx) => (
                <tr key={e.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-500">{idx + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium">{e.patientName}</td>
                  <td className="px-4 py-3 text-sm">{e.schoolClass}</td>
                  <td className="px-4 py-3 text-sm">{e.date}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-700">
                      📅 {e.reExamDate}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 italic">{e.reExamNote || "—"}</td>
                </tr>
              ))}
              {exams.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-400">
                    Không có lịch tái khám nào sắp tới
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReExamList;
