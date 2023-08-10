import AdminSidebar from "../components/AdminSidebar";
import AdminRoutes from "../Routes/AdminRoutes";
import React from "react";

const AdminPanel = ({sidebarToggled}) => {
    return (
        <div className="d-flex">
            <div>
                <AdminSidebar toggled={sidebarToggled}/>
            </div>
            <AdminRoutes/>
        </div>
    );
}

export default AdminPanel;