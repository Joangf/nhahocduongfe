import { TableColumn } from "@/components/Table/type";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState, useCallback } from "react";
import { Tooltip } from "@mui/material";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Table from "@/components/Table";
import Swal from "sweetalert2";
import Input from "@/components/Input";

interface RegistrationRequest {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  registrationDate: string;
  status: "pending" | "approved" | "rejected";
}

const columns: TableColumn[] = [
  {
    title: "STT",
    dataIndex: "stt",
  },
  {
    title: "Tài khoản",
    dataIndex: "username",
  },
  {
    title: "Họ và tên",
    dataIndex: "fullName",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Số điện thoại",
    dataIndex: "phoneNumber",
  },
  {
    title: "Ngày đăng ký",
    dataIndex: "registrationDate",
  },
  {
    title: "Thao tác",
    dataIndex: "action",
  },
];

// Mock data
const mockRegistrationData: RegistrationRequest[] = [
  {
    id: 1,
    username: "nguyenvana",
    firstName: "A",
    lastName: "Nguyễn Văn",
    email: "nguyenvana@example.com",
    phoneNumber: "0901234567",
    registrationDate: "2024-06-15",
    status: "pending",
  },
  {
    id: 2,
    username: "tranThixyz",
    firstName: "Xây",
    lastName: "Trần Thị",
    email: "tranthixyz@example.com",
    phoneNumber: "0987654321",
    registrationDate: "2024-06-14",
    status: "pending",
  },
  {
    id: 3,
    username: "phambao123",
    firstName: "Báo",
    lastName: "Phạm",
    email: "phambao@example.com",
    phoneNumber: "0912345678",
    registrationDate: "2024-06-13",
    status: "pending",
  },
  {
    id: 4,
    username: "hoangminh456",
    firstName: "Minh",
    lastName: "Hoàng",
    email: "hoangminh456@example.com",
    phoneNumber: "0923456789",
    registrationDate: "2024-06-12",
    status: "pending",
  },
  {
    id: 5,
    username: "dothikieu",
    firstName: "Kiều",
    lastName: "Đỗ Thị",
    email: "dothikieu@example.com",
    phoneNumber: "0934567890",
    registrationDate: "2024-06-11",
    status: "pending",
  },
];

const AccountRegistrationList = () => {
  const [curPage, setCurPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [dataFetching, setDataFetching] = useState<RegistrationRequest[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [reFetching, setReFetching] = useState<boolean>(false);

  // Simulate fetching data
  const fetchRegistrations = useCallback((page: number, search?: string) => {
    // Filter by search text
    let filtered = mockRegistrationData;
    if (search) {
      filtered = mockRegistrationData.filter(
        (item) =>
          item.username.toLowerCase().includes(search.toLowerCase()) ||
          `${item.lastName} ${item.firstName}`
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          item.email.toLowerCase().includes(search.toLowerCase()) ||
          item.phoneNumber.includes(search),
      );
    }

    // Filter only pending registrations
    filtered = filtered.filter((item) => item.status === "pending");

    // Calculate pagination
    const itemsPerPage = 10;
    const total = Math.ceil(filtered.length / itemsPerPage);
    setTotalPage(total);

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setDataFetching(filtered.slice(start, end));
  }, []);

  useEffect(() => {
    fetchRegistrations(curPage, searchText);
  }, [curPage, reFetching, fetchRegistrations, searchText]);

  const handleSearch = () => {
    setCurPage(1);
    fetchRegistrations(1, searchText);
  };

  const handleApprove = (id: number, username: string) => {
    Swal.fire({
      html: "Bạn có muốn duyệt tài khoản " + `<b>${username}</b>` + " không?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#059669",
      confirmButtonText: "Duyệt",
      cancelButtonText: "Huỷ",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Simulate API call
        setTimeout(() => {
          // Update mock data
          const updatedData = mockRegistrationData.map((item) =>
            item.id === id ? { ...item, status: "approved" } : item,
          );
          // In real app, this would come from API
          Swal.fire({
            icon: "success",
            title: "Duyệt tài khoản thành công!",
          }).then(() => {
            setReFetching((prev) => !prev);
          });
        }, 500);
      }
    });
  };

  const handleReject = (id: number, username: string) => {
    Swal.fire({
      html: "Bạn có muốn từ chối tài khoản " + `<b>${username}</b>` + " không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Từ chối",
      cancelButtonText: "Huỷ",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Simulate API call
        setTimeout(() => {
          Swal.fire({
            icon: "success",
            title: "Từ chối tài khoản thành công!",
          }).then(() => {
            setReFetching((prev) => !prev);
          });
        }, 500);
      }
    });
  };

  const dataSource = dataFetching.map(
    (data: RegistrationRequest, idx: number) => ({
      stt: (curPage - 1) * 10 + idx + 1,
      username: data.username || "-",
      fullName: `${data.lastName || ""} ${data.firstName || ""}`.trim() || "-",
      email: data.email || "-",
      phoneNumber: data.phoneNumber || "-",
      registrationDate: data.registrationDate || "-",
      action: (
        <span className="flex justify-center gap-4">
          <Tooltip title="Duyệt" placement="top">
            <CheckCircleIcon
              className="h-6 w-6 cursor-pointer text-green-600 hover:text-green-800"
              onClick={() => handleApprove(data.id, data.username)}
            />
          </Tooltip>
          <Tooltip title="Từ chối" placement="top">
            <XCircleIcon
              className="h-6 w-6 cursor-pointer text-red-600 hover:text-red-800"
              onClick={() => handleReject(data.id, data.username)}
            />
          </Tooltip>
        </span>
      ),
    }),
  );

  const paging = () => {
    const pageIdx = [];
    for (let i = 0; i < totalPage; i++) {
      pageIdx.push(
        <a
          key={i}
          onClick={() => setCurPage(i + 1)}
          aria-current="page"
          className={
            curPage === i + 1
              ? "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          }
        >
          {i + 1}
        </a>,
      );
    }
    return pageIdx;
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex gap-3">
          <Input
            placeholder="Tìm tài khoản, họ tên, email, SĐT"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <Button onClick={handleSearch}>Tìm kiếm</Button>
        </div>
      </div>

      <Card>
        <Table columns={columns} dataSource={dataSource} />
      </Card>

      {/* Pagination */}
      {totalPage > 1 && (
        <div className="flex cursor-pointer items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <a
              onClick={() =>
                curPage === 1 ? {} : setCurPage((old) => old - 1)
              }
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </a>
            <a
              onClick={() =>
                curPage === totalPage ? {} : setCurPage((old) => old + 1)
              }
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next
            </a>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                {paging()}
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountRegistrationList;
