import AdminSidebar from "../components/AdminSidebar";
import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";

const AdminLayout = () => {
  const [sidebarToggled, setSidebarToggled] = useState(false);
  const isAuthenticated = true;

  return isAuthenticated ? (
    <>
      <Navbar onToggleSideBar={() => setSidebarToggled(!sidebarToggled)} />
      <div className="d-flex">
        <div>
          <AdminSidebar toggled={sidebarToggled} />
        </div>
        <Outlet />
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminLayout;
