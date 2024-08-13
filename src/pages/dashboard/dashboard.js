import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/sidebar";

function Dashboard() {
  return (
    <div className="container-fluid position-relative">
      <div
        style={{ width: "20%" }}
        className="bg-dark position-fixed srart-0 left-0"
      >
        <Sidebar />
      </div>
      <div style={{ width: "80%" }} className="p-5 position-absolute end-0">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
