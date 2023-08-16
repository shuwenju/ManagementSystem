import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import moment from "moment/moment";

export const OrderDetails = () => {
    const [order, setOrder] = useState({
        id: "",
        customer: {
            id: "",
            name: "",
            address: "",
        },
        applicationUser: {
            firstName: "",
            lastName: "",
            userName: ""
        },
        crossAmount: "",
        shippingAddress: "",
        orderStatus: "",
        orderItems: [
            {
                itemQuantity: 1,
                item: {
                    id: "",
                    name: "",
                    description: "",
                    price: 0,
                }
            }
        ]
    });
    const {id} = useParams();

    const fetchOrder = useCallback(async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await axios.get(`https://localhost:44343/api/Orders/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setOrder(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }, [id]);

    useEffect(() => {
        fetchOrder();
    }, [fetchOrder]);

    return (
        <div className="wrapper flex-column">
            <div className="row">
                <div className="col text-center mb-5">
                    <h3 className="text-body-secondary fw-bolder">Order Details</h3>
                </div>
            </div>
            <div className="row g-2 g-md-4 align-items-baseline mb-4" style={{fontSize: "14px"}}>
                <div className="col-12 col-md-6 col-lg-2">
                    <p className="fw-semibold ps-2 p-md-0">Customer Name:</p>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <input type="text" className="form-control w-auto" disabled
                           defaultValue={order.customer?.name}/>
                </div>
                <div className="col-12 col-md-6 col-lg-2">
                    <p className="fw-semibold ps-2 p-md-0">Order no:</p>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <input type="text" className="form-control w-auto" disabled
                           defaultValue={order.id}/>
                </div>
                <div className="col-12 col-md-6 col-lg-2">
                    <p className="fw-semibold ps-2 p-md-0">Customer Address:</p>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <input type="text" className="form-control w-auto" disabled
                           defaultValue={order.customer?.address}/>
                </div>
                <div className="col-12 col-md-6 col-lg-2">
                    <p className="fw-semibold ps-2 p-md-0">Order Date:</p>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <input type="text" className="form-control w-auto" disabled
                           defaultValue={moment(order.createdAt).format('YYYY-MM-DD')}/>
                </div>
                <div className="col-12 col-md-6 col-lg-2">
                    <p className="fw-semibold ps-2 p-md-0">Created By:</p>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <input type="text" className="form-control w-auto" disabled
                           defaultValue={`${order.applicationUser?.firstName} ${order.applicationUser?.lastName}`}/>
                </div>
                <div className="col-12 col-md-6 col-lg-2">
                    <p className="fw-semibold ps-2 p-md-0">Order Status:</p>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <input type="text" className="form-control w-auto" disabled
                           defaultValue={order.orderStatus}/>
                </div>
            </div>
            <div className="p-3 rounded bg-light mb-4" style={{fontSize: "14px"}}>
                <table className="table table-bordered table-light table-hover">
                    <thead className="table-primary">
                    <tr>
                        <th scope="col">Item#</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">description</th>
                        <th scope="col">Unit Price</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Total</th>
                    </tr>
                    </thead>
                    <tbody className="table-group-divider">
                    {order.orderItems?.map((orderItem, index) => (
                        <tr key={index}>
                            <td>{orderItem?.item?.id}</td>
                            <td>{orderItem?.item?.name}</td>
                            <td>{orderItem?.item?.description}</td>
                            <td>${orderItem?.item?.price}</td>
                            <td>{orderItem?.itemQuantity}</td>
                            <td>${Number(orderItem?.item?.price) * Number(orderItem?.itemQuantity)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="col-12" style={{fontSize: "14px"}}>
                <div className="row justify-content-end align-items-baseline">
                    <p className="col-sm-4 col-lg-3 text-end fw-semibold">Gross Amount:</p>
                    <div className="col-sm-4 col-lg-2">
                        <input type="text" className="form-control" disabled
                               defaultValue={order.crossAmount}/>
                    </div>
                </div>
            </div>
        </div>
    );
};