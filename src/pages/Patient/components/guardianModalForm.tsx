import Button from "@/components/Button";
import Card from "@/components/Card";
import Checkbox from "@/components/Checkbox";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import RadioButton from "@/components/RadioButton";
import Table from "@/components/Table";
import { XMarkIcon } from "@heroicons/react/24/outline";

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
    title: "Mã BN",
    dataIndex: "patientCode",
  },
  {
    title: "Họ và tên",
    dataIndex: "name",
  },
  {
    title: "Mối quan hệ",
    dataIndex: "relationShip",
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
    title: "SĐT",
    dataIndex: "phoneNumber",
  },
  {
    title: "email",
    dataIndex: "email",
  },
  {
    title: "",
    dataIndex: "handle",
  },
];

const genders = {
  option: [
    { value: "0", label: "Nam" },
    { value: "1", label: "Nữ" },
  ],
};

const dataSource = new Array(2).fill(0).map(() => ({
  checkbox: <Checkbox />,
  STT: "".concat(Math.random().toString().substring(2, 4)),
  patientCode: "ML-".concat(Math.random().toString().substring(2, 10)),
  name: "Nguyễn Văn ".concat(Math.random().toString().substring(2, 3)),
  relationShip: "A ".concat(Math.random().toString().substring(2, 3)),
  gender: ["Nam", "Nữ"][Math.floor(Math.random() * 2)],
  DOB: new Date(1999, 7, 10).toLocaleDateString(),
  phoneNumber: "".concat(Math.random().toString().substring(2, 10)),
  email: "HCMUTE@gmail.com",
  handle: (
    <span className="flex gap-4">
      <XMarkIcon className="h-6 w-6" color="red" />
    </span>
  ),
}));

const GuardianModal = ({ isOpen, setIsOpen }: Props) => {
  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Người Giám Hộ">
        <div className="flex justify-center gap-8">
          <div className="flex w-full flex-col gap-6">
            <div>
              <Table columns={columns} dataSource={dataSource} />
            </div>
            <div className="flex justify-end">
              <Button>Thêm mới người giám hộ</Button>
            </div>
            <Card>
              <div className=" grid grid-cols-4 gap-8 p-2">
                <Input label="Mã BN" />
                <Input label="Họ và tên" />
                <Input label="Mối quan hệ" />
                <div className="grid grid-cols-1 gap-4">
                  Giới tính
                  <div className="grid-row-1 flex gap-4">
                    {genders.option.map((gender) => (
                      <RadioButton
                        label={gender.label}
                        name="status-group"
                        id={gender.value}
                        key={gender.value}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className=" grid grid-cols-4 gap-8 p-2">
                <Input label="Ngày sinh" type="date" />
                <Input label="SĐT" />
                <div className="col-span-2">
                  <Input label="Email" />
                </div>
              </div>
              <div className=" grid grid-cols-1">
                <label
                  htmlFor="note"
                  className=" mt-2 p-2 text-sm font-medium text-gray-900"
                >
                  Ghi chú
                </label>
                <div className="mt-2 p-2">
                  <textarea
                    id="note"
                    name="note"
                    className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></textarea>
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

export default GuardianModal;
