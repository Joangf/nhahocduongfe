import React, { useEffect, useState } from "react";
import { api } from "@/api/api";

interface Props {}
const Dashboard = (props: Props) => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    api.get("/api/dashboard/campaign-stats").then(res => setStats(res.data)).catch(console.error);
  }, []);

  return (
    <div className="h-[calc(100vh-4rem)] min-w-full flex flex-col">
      {stats && (
        <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 border-b">
          <div className="bg-white p-4 shadow rounded border-l-4 border-blue-500">
            <h3 className="text-gray-500 text-sm font-bold uppercase">Tổng đợt khám</h3>
            <p className="text-2xl font-bold">{stats.totalCampaigns}</p>
          </div>
          <div className="bg-white p-4 shadow rounded border-l-4 border-green-500">
            <h3 className="text-gray-500 text-sm font-bold uppercase">Đợt đang hoạt động</h3>
            <p className="text-2xl font-bold">{stats.activeCampaigns}</p>
          </div>
          <div className="bg-white p-4 shadow rounded border-l-4 border-yellow-500">
            <h3 className="text-gray-500 text-sm font-bold uppercase">Tổng số học sinh</h3>
            <p className="text-2xl font-bold">{stats.totalStudents}</p>
          </div>
          <div className="bg-white p-4 shadow rounded border-l-4 border-purple-500">
            <h3 className="text-gray-500 text-sm font-bold uppercase">Đã khám xong</h3>
            <p className="text-2xl font-bold">{stats.totalExamined}</p>
          </div>
        </div>
      )}
      <iframe
        className="flex-grow min-w-full"
        src="https://datastudio.vietteldmp.vn/public/dashboard/99760b01-3c9c-4c94-8e8e-ec0acb0f9713/?disable_header=true&height=2064"
      />
    </div>
  );
};
export default Dashboard;
