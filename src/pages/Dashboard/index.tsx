interface Props {}
const Dashboard = (props: Props) => {
  return (
    <div className="h-[calc(100vh-4rem)] min-w-full">
      <iframe
        className="min-h-full min-w-full"
        src="https://datastudio.vietteldmp.vn/public/dashboard/99760b01-3c9c-4c94-8e8e-ec0acb0f9713/?disable_header=true&height=2064"
      />
    </div>
  );
};
export default Dashboard;
