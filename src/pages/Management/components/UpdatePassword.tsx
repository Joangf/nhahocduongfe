import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { useFormik } from "formik";
import { useQuery } from "react-query";
import { IUserInformation } from "../type";
import { api } from "@/api/api";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { omit } from "lodash";

interface Props {
  isEdit: boolean;
  organizationId?: any;
  onSuccess?: () => void;
}

const getProvincesFetcher = async () => {
  return await api.get("/api/areas/lookup?region=SOUTH").then((result) => {
    return result.data;
  });
};

const getOrganizesById = async (id: string) => {
  return await api.get(`/api/organizations/${id}`).then((res) => res.data);
};

const init = {
  username: "",
  name: "",
  company: "",
  province: "",
  school: "",
  password: "",
  rePassword: "",
  areaCode: "",
  classes: {},
  inputClassName: "",
};

const UpdatePasswordForm = ({
  isEdit = false,
  organizationId,
  onSuccess,
}: Props) => {
  const [valuesOnchange, setValueOnchange] = useState<any>();

  const { data: provinces } = useQuery(
    "getProvincesFetcher",
    getProvincesFetcher,
    {
      refetchOnWindowFocus: false,
    },
  );

  const { data: organization } = useQuery(
    "getOrganizesById",
    () => getOrganizesById(organizationId),
    {
      refetchOnWindowFocus: false,
      enabled: isEdit && !!provinces,
    },
  );

  const formik = useFormik<IUserInformation>({
    initialValues: init,
    onSubmit: (values: any) => {
      const compactData = omit(values, "inputClassName");

      const submitData = {
        ...compactData,
        address: values.address.name,
        code: values.areaCode,
        areaCode: values.address.code,
      };

      if (isEdit) {
        Swal.fire({
          icon: "info",
          html:
            "Bạn muốn chỉnh sửa trường học " +
            `<b>${formik.values.name}</b>` +
            " không?",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Chỉnh sửa",
          cancelButtonText: "Huỷ",
          reverseButtons: true,
        }).then((response) => {
          if (response.isConfirmed) {
            api
              .put(`/api/organization/${organizationId}`, submitData)
              .then(() => {
                Swal.fire({
                  icon: "success",
                  title: "Chỉnh sửa trường học thành công",
                }),
                  onSuccess && onSuccess();
              })
              .catch((err) =>
                Swal.fire({
                  icon: "error",
                  title:
                    "Chỉnh sửa trường học không thành công, tên lớp không được trùng!",
                }),
              );
          }
        });
      } else {
        api
          .post("/api/organization", submitData)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Thêm trường học thành công",
            });
            onSuccess && onSuccess();
          })
          .catch((err) => {
            if (err.response.status) {
              Swal.fire({
                icon: "error",
                title:
                  "Thêm trường không thành công, tên lớp không được trùng!",
              });
            }
          });
      }
    },
  });

  function handleChange(value: any) {
    setValueOnchange(value);
  }

  useEffect(() => {
    handleChange(valuesOnchange);
  }, [valuesOnchange]);

  useEffect(() => {
    if (!organization || !isEdit) {
      formik.setFieldValue("classes", {});
    } else {
      const address = provinces.find(
        (item: any) => item.name === organization.address,
      );
      formik.setFieldValue("name", organization.name);
      formik.setFieldValue("areaCode", organization.code);
      formik.setFieldValue("address", address);
      formik.setFieldValue("classes", organization.classes);
    }
  }, [organization]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mt-5 grid grid-cols-2">
        <div className="flex items-center">Mật khẩu mới:</div>
        <Input
          value={formik.values.password}
          onChange={formik.handleChange}
          name="password"
          label=""
          placeholder="Nhập mật khẩu"
        />
      </div>
      <div className="mt-5 grid grid-cols-2">
        <div className="flex items-center">Xác nhận mật khẩu:</div>
        <Input
          value={formik.values.rePassword}
          onChange={formik.handleChange}
          name="rePassword"
          label=""
          placeholder="Nhập lại mật khẩu"
        />
      </div>

      <div className="mt-4 flex justify-end">
        <Button type="submit">Lưu</Button>
      </div>
    </form>
  );
};
export default UpdatePasswordForm;
