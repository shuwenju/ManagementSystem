import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import Tracking from "../pages/Tracking";
const AppRoutes = () => {
  return (
    <>
      <AdminRoutes />
      <UserRoutes />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tracking" element={<Tracking />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
