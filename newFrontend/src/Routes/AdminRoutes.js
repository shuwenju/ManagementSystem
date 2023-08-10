import React, {Fragment} from "react";
import {Route, Routes} from "react-router-dom";
import {Dashboard} from "../pages/Dashboard";
import {Employees} from "../pages/Employees";
import {Customers} from "../pages/Customers";
import {Products} from "../pages/Products";
import {Orders} from "../pages/Orders";
import {Reports} from "../pages/Reports";
import {Setting} from "../pages/Setting";

const AdminRoutes = () => {

    return (
        <Fragment>
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/employees" element={<Employees/>}/>
                <Route path="/customers" element={<Customers/>}/>
                <Route path="/products" element={<Products/>}/>
                <Route path="/orders" element={<Orders/>}/>
                <Route path="/reports" element={<Reports/>}/>
                <Route path="/setting" element={<Setting/>}/>
            </Routes>
        </Fragment>
    );
};

export default AdminRoutes;
