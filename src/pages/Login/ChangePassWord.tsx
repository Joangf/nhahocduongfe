import Button from "@/components/Button";
import Input from "@/components/Input";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { isEmpty, omit } from "lodash";
import { IUpdatePassword } from "../Management/type";
import * as Yup from "yup";

interface Props {
  onSuccess?: () => void;
}

const init = {
  password: "",
  rePassword: "",
};

const ChangePasswordForm = ({ onSuccess }: Props) => {
  const [valuesOnchange, setValueOnchange] = useState<any>();

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Vui lòng nhập mật khẩu")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm số, chữ cái thường và chữ cái IN HOA, và phải có ít nhất 1 ký tự đặc biệt ~!@#$%^&*",
      ),
    rePassword: Yup.string()
      .required("Vui lòng nhập mật khẩu mới")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm số, chữ cái thường và chữ cái IN HOA, và phải có ít nhất 1 ký tự đặc biệt ~!@#$%^&*",
      ),
  });

  const formik = useFormik<IUpdatePassword>({
    initialValues: init,
    onSubmit: (values: any) => {
      const submitData = {
        password: values.password,
        rePassword: values.rePassword,
      };
      console.log(submitData);
    },
    validationSchema: validationSchema,
  });

  const { dirty, errors } = formik;

  function handleChange(value: any) {
    setValueOnchange(value);
  }

  useEffect(() => {
    handleChange(valuesOnchange);
  }, [valuesOnchange]);

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
          error={formik.errors.password}
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
          error={formik.errors.rePassword}
        />
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          isDisabled={!isEmpty(errors) || !dirty}
          type="submit"
          className="h-14 text-lg"
        >
          Lưu
        </Button>
      </div>
    </form>
  );
};
export default ChangePasswordForm;
