import Input from "@/components/Input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useQuery } from "react-query";
import { api } from "@/api/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";

type PatientType = {
  fullName: string;
  birthDate?: string;
  gender?: number;
  healthInsuranceNumber?: string;
  ethnic?: string;
  areaType?: string;
};

interface IPatientInfo {
  onSearchPatient: () => void;
  ref: any;
  initialValues?: PatientType;
}

const initialValues: PatientType = {
  fullName: "",
  birthDate: undefined,
  gender: undefined,
  healthInsuranceNumber: undefined,
  ethnic: undefined,
  areaType: undefined,
};

const patientInfoSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  gender: Yup.number().required("Required"),
});

const PatientInfo = React.forwardRef<IPatientInfo, IPatientInfo>(
  ({ onSearchPatient, initialValues: initialValuesProp }, ref) => {
    const { data, isLoading, error } = useQuery("myData", () =>
      api.get("/patients").then((response) => response.data.content[0]),
    );

    const formik = useFormik({
      initialValues: initialValuesProp || initialValues,
      validationSchema: patientInfoSchema,
      onSubmit: () => {},
      validateOnBlur: true,
    });

    React.useImperativeHandle(ref, () => formik.values as any);

    useEffect(() => {
      if (!data) return;

      formik.setValues({ ...data });
    }, [data]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error</div>;
    }

    return (
      <div className="grid grid-cols-4 grid-rows-4 gap-x-8 gap-y-2">
        <div className="relative">
          <Input
            label="Mã bệnh nhân"
            addOnAfter={
              <button onClick={onSearchPatient}>
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>
            }
          />
        </div>

        <Input
          label="Họ và tên"
          name="fullName"
          onChange={formik.handleChange}
          value={formik.values.fullName}
          error={formik.errors.fullName}
          disabled
        />

        <Input
          label="Ngày sinh"
          type="date"
          name="birthDate"
          onChange={formik.handleChange}
          value={formik.values.birthDate}
        />

        <Input
          label="Giới tính"
          name="gender"
          onChange={formik.handleChange}
          value={formik.values.gender}
        />

        <div className="col-span-2 ">
          <Input label="Trường học" fullWidth />
        </div>

        <Input label="Lớp" />

        <Input
          label="Vùng địa dư"
          name="areaType"
          onChange={formik.handleChange}
          value={formik.values.areaType}
          error={formik.errors.areaType}
        />

        <Input label="Quốc tịch" />

        <Input
          label="Dân tọc"
          name="ethnic"
          onChange={formik.handleChange}
          value={formik.values.ethnic}
        />

        <Input label="Người giám hộ" />

        <Input label="SDT" />

        <Input label="Mã định danh công dân" />
        <Input label="Ngày cấp" />
        <Input label="Nơi cấp" />
        <Input
          label="Mã thẻ BHYT"
          name="healthInsuranceNumber"
          onChange={formik.handleChange}
          value={formik.values.healthInsuranceNumber}
        />
      </div>
    );
  },
);

export default PatientInfo;
