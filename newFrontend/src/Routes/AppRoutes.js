import {Navigate, Route, Routes} from "react-router-dom";
import Login from "../pages/Login";
import Customers from "../pages/Customers"
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";

const AppRoutes = () => {
    return (
        <>
            <AdminRoutes/>
            <UserRoutes/>
            <Routes>
                <Route path="/" element={<Navigate to="/login"/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </>
    );
}

export default AppRoutes;