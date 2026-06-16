import Button from "@/components/Button";
import Card from "@/components/Card";
import Checkbox from "@/components/Checkbox";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import Table from "@/components/Table";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const columns = [
  {
    title: "",
    dataIndex: "checkbox",
  },
  {
    title: "STT",
    dataIndex: "STT",
  },
  {
    title: "Mã thẻ BHYT",
    dataIndex: "healthInsuranceCode",
  },
  {
    title: "Nơi ĐKKCB ban đầu",
    dataIndex: "place",
  },
  {
    title: "Từ ngày",
    dataIndex: "startDate",
  },
  {
    title: "Đến ngày",
    dataIndex: "endDate",
  },
  {
    title: "Đủ 5 năm từ",
    dataIndex: "from",
  },
  {
    title: "",
    dataIndex: "handle",
  },
];

const place = [
  { value: 0, label: "TP HCM" },
  { value: 1, label: "Hà Nội" },
  { value: 2, label: "Đà Nẵng" },
  { value: 3, label: "Hải Phòng" },
];

const dataSource = new Array(2).fill(0).map(() => ({
  checkbox: <Checkbox />,
  STT: "".concat(Math.random().toString().substring(2, 4)),
  healthInsuranceCode: "ML-".concat(Math.random().toString().substring(2, 10)),
  place: "Văn Phòng ".concat(Math.random().toString().substring(2, 3)),
  startDate: new Date(2023, 7, 1).toLocaleDateString(),
  endDate: new Date(2023, 10, 1).toLocaleDateString(),
  from: new Date(2023, 7, 10).toLocaleDateString(),
  handle: (
    <span className="flex gap-4">
      <XMarkIcon className="h-6 w-6" color="red" />
    </span>
  ),
}));

const HealthInsuranceModal = ({ isOpen, setIsOpen }: Props) => {
  const [isSelect, setIsSelect] = useState();
  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Thẻ Bảo Hiểm Y Tế">
        <div className="flex justify-center gap-8">
          <div className="flex  w-full flex-col gap-6">
            <div>
              <Table columns={columns} dataSource={dataSource} />
            </div>
            <div className="flex justify-end">UpdateHealthCheckButton</div>
            <Card>
              <div className=" grid grid-cols-3 gap-8 p-2">
                <Input label="Mã thẻ BHYT" />
                <Input label="Hạn thẻ từ ngày" type="date" />
                <Input label="Đến ngày" type="date" />
              </div>
              <div className=" grid grid-cols-1 gap-8 p-2">
                <Select
                  label="Nơi đăng ký KCB ban đầu"
                  fullWidth
                  options={place}
                  placeholder="Chọn nơi đăng ký KCB ban đầu"
                  value={isSelect}
                  onChange={(e) => setIsSelect(e)}
                />
              </div>

              <div className=" grid grid-cols-3 gap-8 p-2">
                <Input label="Ngày đủ 5 năm" type="date" />
                <div className="col-span-2">
                  <Input label="Khu vực" />
                </div>
              </div>
            </Card>
            <div className="flex items-center justify-end gap-6">
              <Button variants="outlined" onClick={() => setIsOpen(false)}>
                Đóng
              </Button>
              <Button>Lưu</Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default HealthInsuranceModal;
