import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import moment from "moment";
import {CDBIcon} from "cdbreact";
import {NavLink, redirect, useLocation} from "react-router-dom";
import {OrderEdit} from "./OrderEdit";
import Swal from "sweetalert2";

export const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [orderEdit, setOrderEdit] = useState({
        id: "",
        edit: false
    });
    const location = useLocation();
    const routePath = location.pathname.startsWith("/admin") ? "/admin" : "/user";

    const fetchOrdersList = useCallback(async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await axios.get("https://localhost:44343/api/Orders", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setOrders(response.data);
            console.log(location);
            if (location?.state) {
                Swal.fire({
                    icon: "success",
                    title: location?.state?.message,
                });
                location.state = null;
                redirect(location.pathname, { replace: true });
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
                <div className="col border rounded p-3 bg-light">
                    <NavLink to={`${routePath}/orders/add`} role="button" className="btn btn-primary fw-semibold mb-4">
                        Add Order
                    </NavLink>
                    <table className="table table-bordered table-light table-hover">
                        <thead className="table-primary">
                        <tr>
                            <th scope="col">Order#</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Date</th>
                            <th scope="col">Create By</th>
                            <th scope="col">Cross Amount</th>
                            <th scope="col">Shipping Address</th>
                            <th scope="col">Order Status</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody className="table-group-divider">
                        {orders.map((o) => (
                            <tr key={o.id} className="align-middle">
                                <th scope="row">{o.id}</th>
                                <td>{o.customer.name}</td>
                                <td>{moment(o.createdAt).format('YYYY-MM-DD')}</td>
                                <td>{`${o.applicationUser.firstName} ${o.applicationUser.lastName}`}</td>
                                <td>${o.crossAmount}</td>
                                <td>{o.customer.address}</td>
                                {
                                    orderEdit.id === o.id && orderEdit.edit  ?
                                        <td>
                                            <OrderEdit
                                                orderId={o.id}
                                                orderStatus={o.orderStatus}
                                                setOrderEdit={setOrderEdit}
                                                fetchOrdersList={fetchOrdersList}
                                            />
                                        </td>
                                        :
                                        <td className={o.orderStatus === "Pending" ? "text-warning"
                                            : o.orderStatus === "Cancelled" ? "text-danger"
                                                : o.orderStatus === "Shipped" ? "text-info" : "text-success"}>
                                            {o.orderStatus}
                                        </td>
                                }
                                <td>
                                    <a href="/#" className="text-warning me-1"
                                       onClick={e => {
                                           e.preventDefault();
                                           setOrderEdit({id: o.id, edit: true})
                                       }}>
                                        <CDBIcon fas icon="edit"/>
                                    </a>
                                    <NavLink to={`${routePath}/orders/details/${o.id}`}>
                                        <CDBIcon fas icon="eye"/>
                                    </NavLink>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}