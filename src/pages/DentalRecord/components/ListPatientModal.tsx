import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import Table from "@/components/Table";
import { TableColumn } from "@/components/Table/type";

import { useState } from "react";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const columns: TableColumn[] = [
  {
    title: "STT",
    dataIndex: "",
  },
  {
    title: "Mã BN",
    dataIndex: "code",
  },
  {
    title: "Họ và tên",
    dataIndex: "name",
  },
  {
    title: "Giới tính",
    dataIndex: "sex",
  },
  {
    title: "Ngày sinh",
    dataIndex: "dob",
  },
  {
    title: "CCCD/ Mã định danh",
    dataIndex: "ids",
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
    dataIndex: "bhyt",
  },
];

const data = [
  {
    stt: 1,
    code: "123",
    name: "Trần Bình Cư",
    sex: "Not found 404",
    dob: "1/1/2000",
    ids: "113114115",
    school: "No go to school",
    class: "0",
    bhyt: "123456789",
  },
  {
    stt: 2,
    code: "123",
    name: "Trần Bình Ca",
    sex: "Not found 404",
    dob: "1/1/2001",
    ids: "113114115",
    school: "UTE",
    class: "1",
    bhyt: "123456789",
  },
];

const ListPatientModal = ({ isOpen, setIsOpen }: Props) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Danh sách bệnh nhân">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-4">
          <Select label="Tỉnh/ thành" />
          <Select label="Trường" />
        </div>
        <div className="flex gap-4">
          <Input placeholder="Tìm kiếm" />
          <Button>Tìm kiếm</Button>
        </div>
        <Table columns={columns} dataSource={data} />
        <div className="flex justify-end gap-4">
          <Button variants="outlined">Huỷ</Button>
          <Button>Lưu</Button>
        </div>
      </div>
    </Modal>
  );
};
export default ListPatientModal;
