import {Navigate, Route, Routes} from "react-router-dom";
import {Dashboard} from "../pages/Dashboard";
import {Customers} from "../pages/Customers";
import {Products} from "../pages/Products";
import {Orders} from "../pages/Orders/Orders";
import {Reports} from "../pages/Reports";
import {Setting} from "../pages/Setting";
import UserLayout from "../Layouts/UserLayout";
import {OrderCreate} from "../pages/Orders/OrderCreate";
import {OrderDetails} from "../pages/Orders/OrderDetails";

const UserRoutes = () => {

    return (
        <Routes>
            <Route path="/user" element={<UserLayout/>}>
                <Route index element={<Navigate to="/user/dashboard"/>}/>
                <Route path="dashboard" element={<Dashboard/>}/>
                <Route path="customers" element={<Customers/>}/>
                <Route path="products" element={<Products/>}/>
                <Route path="orders">
                    <Route index element={<Orders />} />
                    <Route path="add" element={<OrderCreate />} />
                    <Route path="details/:id" element={<OrderDetails />} />
                </Route>
                <Route path="reports" element={<Reports/>}/>
                <Route path="setting" element={<Setting/>}/>
            </Route>
        </Routes>
    );
};

export default UserRoutes;
