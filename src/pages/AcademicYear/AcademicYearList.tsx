import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Table from "@/components/Table";
import { TableColumn } from "@/components/Table/type";
import {
  PencilSquareIcon,
  TrashIcon,
  ArrowPathIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import AcademicYearFormModal from "./AcademicYearFormModal";
import YearTransitionDialog from "./YearTransitionDialog";
import { AcademicYear, academicYearApi } from "@/api/academicYearApi";

const columns: TableColumn[] = [
  { title: "STT", dataIndex: "stt" },
  { title: "Tên năm học", dataIndex: "name" },
  { title: "Ngày bắt đầu", dataIndex: "startDate" },
  { title: "Ngày kết thúc", dataIndex: "endDate" },
  { title: "Trạng thái", dataIndex: "statusBadge" },
  { title: "Thao tác", dataIndex: "action", isAction: true },
];

const STATUS_LABELS: Record<string, string> = {
  UPCOMING: "Chưa bắt đầu",
  CURRENT: "Đang diễn ra",
  COMPLETED: "Đã kết thúc",
};

const STATUS_COLORS: Record<string, string> = {
  UPCOMING: "bg-blue-100 text-blue-800",
  CURRENT: "bg-green-100 text-green-800",
  COMPLETED: "bg-gray-100 text-gray-800",
};

const AcademicYearList = () => {
  const [years, setYears] = useState<AcademicYear[]>([]);
  const [loading, setLoading] = useState(false);

  // Modal
  const [formOpen, setFormOpen] = useState(false);
  const [editId, setEditId] = useState<number | undefined>(undefined);

  // Transition dialog
  const [transitionOpen, setTransitionOpen] = useState(false);

  const fetchYears = async () => {
    setLoading(true);
    try {
      const data = await academicYearApi.getAll();
      setYears(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchYears();
  }, []);

  const handleAdd = () => {
    setEditId(undefined);
    setFormOpen(true);
  };

  const handleEdit = (id: number) => {
    setEditId(id);
    setFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Xác nhận xóa?",
      text: "Hành động này không thể hoàn tác.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });
    if (result.isConfirmed) {
      try {
        await academicYearApi.delete(id);
        Swal.fire("Đã xóa!", "", "success");
        fetchYears();
      } catch (e: any) {
        Swal.fire("Lỗi!", e?.response?.data?.message || "Không thể xóa", "error");
      }
    }
  };

  const handleFormSuccess = () => {
    setFormOpen(false);
    fetchYears();
  };

  const handleTransitionSuccess = () => {
    setTransitionOpen(false);
    fetchYears();
  };

  const tableData = years.map((y, i) => ({
    stt: i + 1,
    name: y.name,
    startDate: y.startDate || "-",
    endDate: y.endDate || "-",
    statusBadge: (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[y.status] || ""}`}>
        {STATUS_LABELS[y.status] || y.status}
      </span>
    ),
    action: (
      <div className="flex gap-2">
        <button onClick={() => handleEdit(y.id)} className="text-blue-600 hover:text-blue-800" title="Sửa">
          <PencilSquareIcon className="w-5 h-5" />
        </button>
        {y.status !== "CURRENT" && (
          <button onClick={() => handleDelete(y.id)} className="text-red-600 hover:text-red-800" title="Xóa">
            <TrashIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    ),
  }));

  return (
    <div className="p-6">
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Quản lý năm học</h2>
          <div className="flex gap-3">
            <Button variants="contained" onClick={handleAdd}>
              + Thêm năm học
            </Button>
            <Button variants="outlined" onClick={() => setTransitionOpen(true)}>
              <ArrowPathIcon className="w-5 h-5 mr-1" />
              Chuyển năm học
            </Button>
          </div>
        </div>

        <Table columns={columns} dataSource={tableData} loading={loading} />
      </Card>

      <AcademicYearFormModal
        open={formOpen}
        editId={editId}
        onClose={() => setFormOpen(false)}
        onSuccess={handleFormSuccess}
      />

      <YearTransitionDialog
        open={transitionOpen}
        onClose={() => setTransitionOpen(false)}
        onSuccess={handleTransitionSuccess}
      />
    </div>
  );
};

export default AcademicYearList;
