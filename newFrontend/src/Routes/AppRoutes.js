import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import Tracking from "../pages/Tracking";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
const AppRoutes = () => {
  return (
    <>
      <AdminRoutes />
      <UserRoutes />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='resetPassword' element={<ResetPassword/>}/>
      </Routes>
    </>
  );
};

export default AppRoutes;
