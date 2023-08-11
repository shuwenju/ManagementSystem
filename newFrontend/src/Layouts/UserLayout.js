import UserSidebar from "../components/UserSidebar";
import {Navigate, Outlet} from "react-router-dom";
import {useState} from "react";
import Navbar from "../components/Navbar";

const UserLayout = () => {
    const [sidebarToggled, setSidebarToggled] = useState(false);
    const isAuthenticated = true;

    return (
        isAuthenticated ?
            (
                <>
                    <Navbar onToggleSideBar={() => setSidebarToggled(!sidebarToggled)}/>
                    <div className="d-flex">
                        <div>
                            <UserSidebar toggled={sidebarToggled}/>
                        </div>
                        <Outlet/>
                    </div>
                </>
            ) :
            <Navigate to="/login"/>
    );
}

export default UserLayout;