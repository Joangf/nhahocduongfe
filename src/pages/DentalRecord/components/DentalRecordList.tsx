import { api } from "@/api/api";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Table from "@/components/Table";
import { TableColumn } from "@/components/Table/type";
import {
  DocumentDuplicateIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {}

const columns: TableColumn[] = [
  {
    title: "STT",
    dataIndex: "STT",
  },
  {
    title: "Mã phiếu",
    dataIndex: "code",
  },
  {
    title: "Ngày khám",
    dataIndex: "DOE",
  },
  {
    title: "Mã bệnh nhân",
    dataIndex: "patientCode",
  },
  {
    title: "Giới tính",
    dataIndex: "gender",
  },
  {
    title: "Ngày sinh",
    dataIndex: "DOB",
  },
  {
    title: "Mã định danh",
    dataIndex: "identifyNumber",
  },
  {
    title: "Trường",
    dataIndex: "school",
  },
  {
    title: "Lớp",
    dataIndex: "class",
  },
  {
    title: "BHYT",
    dataIndex: "BHYT",
  },
  {
    title: "Thao tác",
    dataIndex: "handle",
  },
];

const options = [
  { value: 0, label: "Hà Nội" },
  { value: 1, label: "TP HCM" },
  { value: 2, label: "Đà Nẵng" },
];

const school = [
  { value: 0, label: "Đại Học Sư Phạm Kỹ Thuật" },
  { value: 1, label: "Đại Học Công Nghệ Thông Tin" },
  { value: 2, label: "Đại Học Khoa Học Tự Nhiên" },
  { value: 3, label: "Đại Học Bách Khoa" },
];

const DentalRecordList = (props: Props) => {
  const [isSelectProvince, setIsSelectProvince] = useState();
  const [isSelectSchool, setIsSelectSchool] = useState();
  const navigate = useNavigate();

  const handleCreateButton = () => {
    navigate("/dental-record/create");
  };

  const dataSource = new Array(10).fill(0).map(() => ({
    STT: "".concat(Math.random().toString().substring(2, 10)),
    code: "Nguyễn Văn ".concat(Math.random().toString().substring(2, 3)),
    DOE: new Date(2023, 7, 10).toLocaleDateString(),
    patientCode: "ML-".concat(Math.random().toString().substring(2, 10)),
    patientName: "Nguyễn Văn ".concat(Math.random().toString().substring(2, 3)),
    gender: ["Nam", "Nữ"][Math.floor(Math.random() * 2)],
    DOB: new Date(1999, 7, 10).toLocaleDateString(),
    identifyNumber: "".concat(Math.random().toString().substring(2, 10)),
    school: [
      "Computer Engineering",
      "Đại Học Công Nghệ Thông Tin",
      "Đại Học Khoa Học Tự Nhiên",
    ][Math.floor(Math.random() * 3)],
    class: ["Anh Văn", "Giải tích", "C#"][Math.floor(Math.random() * 3)],
    BHYT: ["Mới", "Cũ"][Math.floor(Math.random() * 2)],
    handle: (
      <span className="flex gap-4">
        <DocumentDuplicateIcon className="h-6 w-6" />
        <PencilSquareIcon className="h-6 w-6" />
        <XMarkIcon className="h-6 w-6 cursor-pointer" color="red" />
      </span>
    ),
  }));

  return (
    <div className="flex  flex-col gap-3">
      <div className="grid grid-cols-4 gap-4">
        <Select
          label="Tỉnh/ Thành"
          placeholder={options[0].label}
          value={isSelectProvince}
          options={options}
          onChange={(v) => setIsSelectProvince(v)}
        />
        <Select
          label="Trường"
          placeholder={school[0].label}
          value={isSelectSchool}
          options={school}
          onChange={(v) => setIsSelectSchool(v)}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input placeholder="Nhập họ tên, mã BN, mã định danh" />
        <div>
          <Button>Tìm kiếm</Button>
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={handleCreateButton}>Tạo mới thông tin</Button>
      </div>
      <Card>
        <Table columns={columns} dataSource={dataSource} />
      </Card>
    </div>
  );
};
export default DentalRecordList;
