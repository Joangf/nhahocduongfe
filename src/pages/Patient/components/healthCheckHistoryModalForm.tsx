import { api } from "@/api/api";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Divider from "@/components/Dividers";
import EditableTextarea from "@/components/EditableTextarea";
import ImageUploadBox from "@/components/ImageUploadBox";
import Odontogram from "@/pages/DentalRecord/components/Odontogram";
import TreatmentTable from "@/pages/DentalRecord/components/TreatmentTable";
import React, { useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import UpdateHeathCheckHistory from "./updateHeathCheckHistory";
import Confirm from "@/components/ConfirmDialog";
import Swal from "sweetalert2";
import TeethOverall from "@/pages/DentalRecord/components/TeethOverall";
import PaginationTable from "@/components/PaginationTable";
import Input from "@/components/Input";
import Checkbox from "@/components/Checkbox";

interface Props {}

const heads = ["Phiếu khám", "Học sinh", "Ngày khám", "Nơi khám", "Thao tác"];

const mapping = (values: any) => {
  const plaqueRecord = {
    "17-16n": values.teethLeft1?.value || "0",
    "11n": values.teethLeft2?.value || "0",
    "26-27n": values.teethLeft3?.value || "0",
    "47-46t": values.teethLeft4?.value || "0",
    "31n": values.teethLeft5?.value || "0",
    "36-37t": values.teethLeft6?.value || "0",
  };

  const tartarRecord = {
    "17-16n": values.teethRight1?.value || "0",
    "11n": values.teethRight2?.value || "0",
    "26-27n": values.teethRight3?.value || "0",
    "47-46t": values.teethRight4?.value || "0",
    "31n": values.teethRight5?.value || "0",
    "36-37t": values.teethRight6?.value || "0",
  };

  return { plaqueRecord, tartarRecord };
};

const HealthCheckModal = (props: Props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const examsRef = useRef<any>(null);
  const odontogramRef = useRef<any>(null);
  const treatmentTableRef = useRef<any>(null);
  const rowIndex = useRef<any>(null);
  const [triggerSubmit, triggerDelete] = useState(false);
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [triggerSumitOdo, setTriggerSumitOdo] = useState(false);
  const plaqueRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [treatmentList, setTreatmentList] = useState([]);
  const [triggerTreatment, setTriggerTreatment] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState("");
  const [searchText, setSearchText] = useState<string>("");
  const [fromDate, setFromDate] = useState<any>();
  const [toDate, setToDate] = useState<any>();
  const [checked, setChecked] = useState<boolean>(false);
  const queryClient = useQueryClient();

  // ── Sections 4, 5, 6 state ──
  const [examDetail, setExamDetail] = useState<any>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const { data: patient } = useQuery(
    `/api/patient/${id}`,
    () => api.get(`/api/patient/${id}`).then((response) => response.data),
    { retry: false, refetchOnWindowFocus: false },
  );

  const deleteHandle = (e: any) => {
    // e.stopPropagation();
    setTimeout(() => {
      setOpen(true);
    });
  };

  const [mappingSource, setMappingSource] = useState<any[]>([
    "id",
    "patientName",
    "date",
    "organizationName",

    <Button onClick={(e) => deleteHandle(e)}>Xóa</Button>,
  ]);

  const {} = useQuery(
    `updateTeethRecord`,
    () =>
      api
        .post(`/api/patients/${id}/exams/${rowIndex.current}/teethRecord`, {
          record: odontogramRef.current,
        })
        .then((response) => response.data.record),
    { enabled: triggerSumitOdo, retry: false, refetchOnWindowFocus: false },
  );

  useQuery(
    `/api/patients/${id}/exams/${rowIndex.current}/plaqueRecord`,
    () =>
      api.post(
        `/api/patients/${id}/exams/${rowIndex.current}/plaqueRecord`,
        mapping(plaqueRef.current).plaqueRecord,
      ),
    {
      enabled: triggerSumitOdo,
      refetchOnWindowFocus: false,
    },
  );

  useQuery(
    `/api/patients/${id}/exams/${rowIndex.current}/tartarRecord`,
    () =>
      api.post(
        `/api/patients/${id}/exams/${rowIndex.current}/tartarRecord`,
        mapping(plaqueRef.current).tartarRecord,
      ),
    {
      enabled: triggerSumitOdo,
      refetchOnWindowFocus: false,
    },
  );

  useQuery(
    "treatmentRecord",
    () =>
      api.post(
        `/api/patients/${id}/exams/${rowIndex.current}/treatmentRecord`,
        treatmentList,
      ),
    {
      enabled: triggerTreatment,
      refetchOnWindowFocus: false,
    },
  );

  function padTo2Digits(num: number) {
    return num.toString().padStart(2, "0");
  }

  function formatDate(date: Date) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-");
  }

  const {} = useQuery(
    ["updateRecord"],
    () =>
      api
        .put(`/api/patients/${id}/exams`, {
          id: rowIndex.current,
          dentistId: 2,
          organizationId: patient.organization?.id
            ? patient.organization.id
            : 1,
          schoolClass: patient.schoolClass,
          date: formatDate(new Date()),
          year: new Date().getFullYear(),
          useVecniFlour: checked,
        })
        .then(async () => {
          await setTriggerSumitOdo(true);
          await setTriggerTreatment(true);
          await Swal.fire({
            icon: "success",
            html: "Chỉnh sửa phiếu khám thành công!",
          });
          navigate(0);
        })
        .catch(() =>
          Swal.fire({
            icon: "error",
            html: "Chỉnh sửa phiếu khám không thành công!",
          }),
        ),
    {
      enabled: triggerUpdate,
      refetchOnWindowFocus: false,
      retry: false,
    },
  );

  useQuery(
    ["deleteRecord", rowIndex.current],
    () =>
      api
        .delete(`/api/exams/${rowIndex.current}`)
        .then(async () => {
          await Swal.fire({
            icon: "success",
            title: "Xoá thành công",
          });
          navigate(0);
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Xoá không thành công",
          });
        })
        .finally(() => triggerDelete(false)),
    {
      enabled: triggerSubmit,
      refetchOnWindowFocus: false,
    },
  );

  const handleBack = () => {
    Swal.fire({
      html: "Bạn có muốn quay lại thông tin học sinh không?",
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Quay lại",
      cancelButtonText: "Hủy",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/patient/detail/${id}`);
      }
    });
  };

  const handleChange = () => {
    setChecked(!checked);
  };

  const handleRecordClicked = async (record: any) => {
    setChecked(record.useVecniFlour);
    rowIndex.current = record.id;
    setSelectedRecordId(record.id);

    // Fetch exam detail để lấy dữ liệu sections 4, 5, 6
    setDetailLoading(true);
    try {
      const res = await api.get(
        `/api/patients/${id}/exams/${record.id}`
      );
      setExamDetail(res.data);
    } catch (err) {
      console.error("Lỗi khi tải chi tiết phiếu khám:", err);
      setExamDetail(null);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleRefresh = () => {
    examsRef.current.refetch();
  };

  const [searchValues, setSearchValues] = useState<any>();

  const handleSearch = (e: any) => {
    examsRef.current.refetch();
    const queryParams = new URLSearchParams();
    if (fromDate) {
      queryParams.append("fromDate", fromDate);
    }
    if (toDate) {
      queryParams.append("toDate", toDate);
    }
    if (searchText) {
      queryParams.append("id", searchText);
    }
    setSearchValues(
      `/search?fromDate=${fromDate ? fromDate : ""}&toDate=${
        toDate ? toDate : ""
      }&id=${searchText}`,
    );
  };

  const handleSubmit = () => {
    Swal.fire({
      icon: "info",
      html: "Bạn muốn chỉnh sửa phiếu khám không?",
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Tiếp tục",
      cancelButtonText: "Huỷ",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await setTriggerUpdate(true);
      }
    });
  };

  // ── PATCH: Cập nhật đánh giá bệnh lý & ghi chú điều trị (mục 4 & 5) ──
  const handleSaveAssessment = async (field: "pathologyAssessment" | "treatmentNote", newValue: string) => {
    if (!selectedRecordId) return;
    const body: any = {};
    body[field] = newValue;
    await api.patch(`/api/exams/${selectedRecordId}/assessment`, body);
    // Refresh exam detail
    setExamDetail((prev: any) => ({ ...prev, [field]: newValue }));
    queryClient.invalidateQueries([`/api/patients/${id}/exams/${selectedRecordId}`]);
  };

  // ── PATCH: Cập nhật ảnh (mục 6) ──
  const handleImageUploaded = async (
    side: "before" | "after",
    publicUrl: string,
    uploadedAt: string
  ) => {
    if (!selectedRecordId) return;
    const body: any = {};
    if (side === "before") {
      body.imageBeforeUrl = publicUrl;
      body.imageBeforeTime = uploadedAt;
    } else {
      body.imageAfterUrl = publicUrl;
      body.imageAfterTime = uploadedAt;
    }
    await api.patch(`/api/exams/${selectedRecordId}/images`, body);
    // Refresh exam detail
    setExamDetail((prev: any) => ({
      ...prev,
      ...(side === "before"
        ? { imageBeforeUrl: publicUrl, imageBeforeTime: uploadedAt }
        : { imageAfterUrl: publicUrl, imageAfterTime: uploadedAt }),
    }));
  };

  // ── PATCH: Xóa ảnh (mục 6) ──
  const handleImageDeleted = async (side: "before" | "after") => {
    if (!selectedRecordId) return;
    const body: any = {};
    if (side === "before") {
      body.imageBeforeUrl = null;
      body.imageBeforeTime = null;
    } else {
      body.imageAfterUrl = null;
      body.imageAfterTime = null;
    }
    await api.patch(`/api/exams/${selectedRecordId}/images`, body);
    // Refresh exam detail
    setExamDetail((prev: any) => ({
      ...prev,
      ...(side === "before"
        ? { imageBeforeUrl: null, imageBeforeTime: null }
        : { imageAfterUrl: null, imageAfterTime: null }),
    }));
  };

  return (
    <>
      <div className="flex  flex-col gap-8  p-4 pb-2">
        <Card>
          <>
            <div className="flex flex-col gap-1">
              <div className="grid grid-cols-10 gap-2">
                <Input
                  label="Từ ngày"
                  type="date"
                  onChange={(e: any) => setFromDate(e.target.value)}
                />
                <Input
                  label="Đến ngày"
                  type="date"
                  onChange={(e: any) => setToDate(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2">
                <div className="flex gap-3">
                  <Input
                    placeholder="Nhập phiếu khám"
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <Button onClick={handleSearch}>Tìm kiếm</Button>
                </div>
                <div className="flex justify-end"></div>
              </div>
            </div>
            <div className="mb-2 flex content-end justify-end">
              <UpdateHeathCheckHistory onSuccess={handleRefresh} />
            </div>
            <PaginationTable
              ref={examsRef}
              url={`/api/patients/${id}/exams`}
              headRows={heads}
              dataPath="data"
              mappingSource={mappingSource}
              onRowSelected={handleRecordClicked}
              searchValues={searchValues}
            />
          </>
        </Card>
        <Card header="1. Tình trạng răng">
          {!selectedRecordId ? (
            <div className="pl-4">* Chọn phiếu khám để xem chi tiết.</div>
          ) : (
            <div className="flex flex-col gap-6">
              <Odontogram
                selectedTreatment={selectedRecordId}
                ref={odontogramRef}
              />
              <Divider />
              <h1 className="text-lg font-bold">
                2. Tình trạng vệ sinh răng miệng (OHI-S)
              </h1>
              <TeethOverall ref={plaqueRef} selectedExam={selectedRecordId} />
              <Divider />
              <h1 className="text-lg font-bold">3. Điều trị</h1>
              <TreatmentTable
                onChange={setTreatmentList}
                selectedExam={selectedRecordId}
                ref={treatmentTableRef}
                odontogramRef={odontogramRef}
              />
              <Checkbox
                name="veneerFlour"
                label="Bôi Veneer Flour"
                onChange={handleChange}
                checked={checked}
              />

              {/* ── Section 4: Đánh giá mức độ bệnh lý ── */}
              <Divider />
              <h1 className="text-lg font-bold">
                4. Đánh giá mức độ bệnh lý
              </h1>
              <EditableTextarea
                label="Nội dung đánh giá"
                value={examDetail?.pathologyAssessment}
                placeholder="Nhập đánh giá mức độ bệnh lý..."
                loading={detailLoading}
                onSave={(newValue) =>
                  handleSaveAssessment("pathologyAssessment", newValue)
                }
              />

              {/* ── Section 5: Ghi chú điều trị ── */}
              <Divider />
              <h1 className="text-lg font-bold">5. Ghi chú điều trị</h1>
              <EditableTextarea
                label="Nội dung ghi chú"
                value={examDetail?.treatmentNote}
                placeholder="Nhập ghi chú điều trị..."
                loading={detailLoading}
                onSave={(newValue) =>
                  handleSaveAssessment("treatmentNote", newValue)
                }
              />

              {/* ── Section 6: Ảnh thực tế trước & sau điều trị ── */}
              <Divider />
              <h1 className="text-lg font-bold">
                6. Ảnh thực tế trước và sau điều trị
              </h1>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <ImageUploadBox
                  label="Ảnh trước điều trị"
                  folder="before"
                  imageUrl={examDetail?.imageBeforeUrl}
                  imageTime={examDetail?.imageBeforeTime}
                  loading={detailLoading}
                  onUploaded={(url, time) =>
                    handleImageUploaded("before", url, time)
                  }
                  onDeleted={() => handleImageDeleted("before")}
                />
                <ImageUploadBox
                  label="Ảnh sau điều trị"
                  folder="after"
                  imageUrl={examDetail?.imageAfterUrl}
                  imageTime={examDetail?.imageAfterTime}
                  loading={detailLoading}
                  onUploaded={(url, time) =>
                    handleImageUploaded("after", url, time)
                  }
                  onDeleted={() => handleImageDeleted("after")}
                />
              </div>
            </div>
          )}
          <div className="mt-5 flex justify-end gap-4">
            {selectedRecordId && (
              <Button onClick={handleSubmit} variants="contained">
                Chỉnh sửa phiếu khám
              </Button>
            )}
          </div>
        </Card>
        <div className="flex justify-end gap-4">
          <Button onClick={handleBack} variants="outlined">
            Quay lại
          </Button>
        </div>
        <Confirm
          open={open}
          onClose={() => setOpen(false)}
          onAccept={() => {
            setOpen(false);
            triggerDelete(true);
          }}
          title="Xác nhận xoá"
          content="Bạn chắc chắn muốn xoá bệnh án này, thao tác này không thể hoàn tác."
        />
      </div>
    </>
  );
};

export default HealthCheckModal;
