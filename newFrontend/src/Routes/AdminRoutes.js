import React, { Fragment } from "react";

import { OrderDetails } from "../pages/OrderDetails";
import { AddOrder } from "../pages/AddOrder";

import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Employees } from "../pages/Employees";
import { Customers } from "../pages/Customers";
import { Products } from "../pages/Products";
import { Orders } from "../pages/Orders";
import { Reports } from "../pages/Reports";
import { Setting } from "../pages/Setting";
import { AddEmployee } from "../pages/AddEmployee";
import AdminLayout from "../Layouts/AdminLayout";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="employees" element={<Employees />} />
        <Route path="add-employee" element={<AddEmployee />} />
        <Route path="customers" element={<Customers />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="add-order" element={<AddOrder />} />
        <Route path="reports" element={<Reports />} />
        <Route path="setting" element={<Setting />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
