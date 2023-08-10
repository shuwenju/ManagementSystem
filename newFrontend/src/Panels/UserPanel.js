import UserSidebar from "../components/UserSidebar";
import UserRoutes from "../Routes/UserRoutes";
import React from "react";

const UserPanel = ({sidebarToggled}) => {
    return (
        <div className="d-flex">
            <div>
                <UserSidebar toggled={sidebarToggled}/>
            </div>
            <UserRoutes/>
        </div>
    );
}

export default UserPanel;