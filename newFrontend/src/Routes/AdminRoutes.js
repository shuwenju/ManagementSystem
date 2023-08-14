import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Customers } from "../pages/Customers";
import { Products } from "../pages/Products";
import { Orders } from "../pages/Orders";
import { OrderDetails } from "../pages/OrderDetails";
import { AddOrder } from "../pages/AddOrder";
import { Reports } from "../pages/Reports";
import { Setting } from "../pages/Setting";
import { Employees } from "../pages/Employees";
import { useState } from "react";
import { AddEmployee } from "../pages/AddEmployee";
import AdminLayout from "../Layouts/AdminLayout";

const AdminRoutes = () => {
  const [employees, setEmployees] = useState([
    { fName: "huang", lName: "danli", email: "danli@gmail.com" },
  ]);
  const addEmployee = (newEmployee) => {
    setEmployees([...employees, newEmployee]);
    console.log(employees);
  };
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/employees" element={<Employees employees={employees} />} />

        <Route path="/add-employee" element={<AddEmployee addEmployee={addEmployee} />} />
        {/* <Route
          path="/employeeslist"
          element={
            <EmployeesList employees={employees} setEmployees={setEmployees} />
          }
        /> */}



        {/* <Route
          path="/add-employee"
          element={<EmployeeForm employees={employees} addEmployee={addEmployee} />}
        /> */}
        <Route path="/customers" element={<Customers />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders-details/:id" element={<OrderDetails />} />
        <Route path="/add-order" element={<AddOrder />} />

        <Route path="/reports" element={<Reports />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </Fragment>
  );
};

export default AdminRoutes;
