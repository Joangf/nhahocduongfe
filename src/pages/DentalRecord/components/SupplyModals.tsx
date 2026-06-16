import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import Table from "@/components/Table";
import Card from "@/components/Card";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import Divider from "@/components/Dividers";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  value: any;
  onChange?: (value: any) => void;
  onSave?: (value: any) => void;
  treatmentLists: any;
  treatmentListDetail: any;
}
const columns = [
  {
    title: "STT",
    dataIndex: "stt",
  },
  {
    title: "Sản phẩm",
    dataIndex: "products",
  },
  {
    title: "Số lượng",
    dataIndex: "amount",
  },
  {
    title: "Đơn vị tính",
    dataIndex: "unit",
  },
  {
    title: "",
    dataIndex: "action",
  },
];

const medicationList = [
  {
    value: 1,
    label: "Fuji 7",
    unit: "Hộp",
  },
  {
    value: 2,
    label: "Fuji 9",
    unit: "Hộp",
  },
  {
    value: 3,
    label: "Clinpro sealant",
    unit: "Hộp",
  },
  {
    value: 4,
    label: "Duraphat sealant",
    unit: "Hộp",
  },
  {
    value: 5,
    label: "Composite",
    unit: "Ống",
  },
  {
    value: 6,
    label: "Thuốc tê Lidocaine",
    unit: "Ống",
  },
  {
    value: 7,
    label: "Thuốc tê xoa",
    unit: "Hộp",
  },
  {
    value: 8,
    label: "Thuốc tê xit",
    unit: "Chai",
  },
  {
    value: 9,
    label: "V-Varnish",
    unit: "Que",
  },
  {
    value: 10,
    label: "Duraphat 22600 ppmF",
    unit: "Que",
  },
  {
    value: 11,
    label: "3M ESPE Varnish 5%",
    unit: "Que",
  },
];

const compactData = (data: any) => {
  return data.map((item: any, key: number) => ({
    quantity: item.amount,
    medicationCode: item.medicationCode,
  }));
};

const getProductByCode = (code: string) => {
  return medicationList.find(
    (item) => item.value.toString() === code.toString(),
  )?.label;
};

const getUnitByCode = (code: string) => {
  return medicationList.find(
    (item) => item.value.toString() === code.toString(),
  )?.unit;
};

const SupplyModals = React.forwardRef<any, any>(
  (
    {
      isOpen,
      setIsOpen,
      onChange,
      onSave,
      treatmentLists,
      treatmentListDetail,
    }: Props,
    ref,
  ) => {
    const [supplyList, setSupplyList] = useState([]);
    const [treatmentListViewDetail, setTreatmentListViewDetail] =
      useState<any>();
    const [listDetail, setListDetail] = useState<any>([]);

    React.useImperativeHandle(ref, () => supplyList as any);

    const deleteHandle = (code: any) => {
      setSupplyList((prevList) =>
        prevList.filter((item: any) => item.medicationCode !== code),
      );
    };

    useEffect(() => {
      if (treatmentListDetail) {
        treatmentListDetail.map((item: any) => {
          if (item?.prescription) {
            setListDetail(item?.prescription);
          } else {
            setListDetail([]);
          }
        });
      } else {
        setListDetail([]);
      }
    }, [treatmentListDetail]);

    useEffect(() => {
      if (treatmentLists) {
        setTreatmentListViewDetail(treatmentLists);
      } else {
        setTreatmentListViewDetail([]);
      }
    }, [treatmentLists]);

    const mappingData = (data: any) => {
      return data.map((item: any, key: number) => ({
        stt: key + 1,
        products: getProductByCode(item.medicationCode),
        unit: getUnitByCode(item.medicationCode),
        amount: item.amount ? item.amount : item.quantity,
        medicationCode: item.medicationCode,
        action: (
          <Button onClick={() => deleteHandle(item.medicationCode)}>Xóa</Button>
        ),
      }));
    };

    useEffect(() => {
      if (treatmentListViewDetail === undefined) return;
      const mappingDataSource = mappingData(treatmentListViewDetail);
      setSupplyList(mappingDataSource);
    }, [treatmentListViewDetail]);

    useEffect(() => {
      if (listDetail === undefined) return;
      const mappingDataSource = mappingData(listDetail);
      setSupplyList(mappingDataSource);
    }, [listDetail]);

    const validationSchema = Yup.object().shape({
      quantity: Yup.number()
        .test({
          name: "Số lượng",
          exclusive: true,
          message: "Số lượng không được là số âm!",
          test: (value: any) => value > 0,
        })
        .required("Vui lòng nhập số lượng"),
    });

    const handleCheckExistItem = (data: any) => {
      const productsCheck: any = {};

      data.forEach((product: any) => {
        if (product.medicationCode in productsCheck) {
          productsCheck[product.medicationCode].amount += product.amount;
        } else {
          productsCheck[product.medicationCode] = product;
        }
      });
      const a = Object.values(productsCheck);
      setSupplyList(a as any);
    };

    const formik = useFormik({
      initialValues: {
        medication: null,
        quantity: null,
      },
      validationSchema: validationSchema,
      onSubmit: (values: any) => {
        const compactValue = {
          medicationCode: values?.medication?.value,
          quantity: values.quantity,
        };

        const newValue = [...supplyList, ...mappingData([compactValue])];

        setSupplyList(newValue as any);
        handleCheckExistItem(newValue);
      },
    });

    useEffect(() => {
      onChange && onChange(compactData(supplyList));
    }, [supplyList]);

    const { values, setFieldValue, handleSubmit, resetForm } = formik;

    const handleSave = () => {
      onSave?.(compactData(supplyList));
      resetForm();
      setIsOpen(false);
    };

    const handleClose = () => {
      setIsOpen(false);
    };

    return (
      <Modal isOpen={isOpen} onClose={handleClose} title="Thuốc/Vật tư y tế">
        <div className="flex flex-col gap-4">
          <div className="flex">
            <b>Dịch vụ</b>
          </div>
          <div className="mb-4 grid grid-cols-4 items-center gap-4">
            <Select
              label="Thuốc/Vật tư y tế"
              value={values.medication}
              onChange={(v) => setFieldValue("medication", v)}
              placeholder="Chọn loại thuốc"
              options={medicationList}
            />
            <div className="flex items-end gap-4">
              <Input
                label="Số lượng"
                value={values.quantity}
                onChange={(e) =>
                  setFieldValue("quantity", Number(e.target.value))
                }
                placeholder="Số lượng"
                type="number"
                error={formik.errors.quantity as string}
                required
              />
              <Button
                type="button"
                onClick={handleSubmit as any}
                isDisabled={!values.quantity}
              >
                Thêm
              </Button>
            </div>
          </div>
          <Card>
            <Table columns={columns} dataSource={supplyList} />
          </Card>
          <Divider />
          <div className="flex justify-end">
            <Button className="mr-2" variants="outlined" onClick={handleClose}>
              Đóng
            </Button>
            <Button onClick={handleSave}>Lưu</Button>
          </div>
          <div className="flex justify-end gap-4"></div>
        </div>
      </Modal>
    );
  },
);

export default SupplyModals;
