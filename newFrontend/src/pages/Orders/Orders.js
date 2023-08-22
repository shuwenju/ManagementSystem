import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import moment from "moment";
import {CDBBtn, CDBIcon, CDBInput} from "cdbreact";
import {NavLink, redirect, useLocation} from "react-router-dom";
import {OrderEdit} from "./OrderEdit";
import Swal from "sweetalert2";
import OrderTable from "./OrderTable";

export const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [filterText, setFilterText] = useState('');

    const location = useLocation();
    const routePath = localStorage.getItem("role") === "Admin" ? "/admin" : "/user";

    const fetchOrdersList = useCallback(async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await axios.get("https://localhost:44343/api/Orders", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setOrders(response.data);
            if (location?.state) {
                Swal.fire({
                    icon: "success",
                    title: location?.state?.message,
                });
                location.state = null;
                window.history.replaceState({}, "");
            }
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }, []);

    useEffect(() => {
        fetchOrdersList();
    }, [fetchOrdersList]);

    return (
        <div className="wrapper flex-column" style={{fontSize: '14px'}}>
            <div className="row">
                <div className="col text-center mb-5">
                    <h3 className="text-body-secondary fw-bolder">Order Information</h3>
                </div>
            </div>
            <div className="row">
                <div className="col border rounded p-3 bg-light overflow-x-auto">
                    <div className="row container mb-4">
                        <div className="col">
                            <NavLink to={`${routePath}/orders/add`} className="text-decoration-none">
                                <CDBBtn color="primary" circle size="large" className="w-50">
                                    Add Order
                                </CDBBtn>
                            </NavLink>
                        </div>
                        <div className="col">
                            <CDBInput placeholder="Search by order id, customer name" color="primary"
                                      icon={<i className="fa fa-search text-primary"></i>}
                                      value={filterText}
                                      onChange={(e) => setFilterText(e.target.value)}
                            />
                        </div>
                    </div>
                    <OrderTable orders={orders}
                                fetchOrdersList={fetchOrdersList}
                                filterText={filterText}
                                routePath={routePath}
                    />
                </div>
            </div>
        </div>
    );
}