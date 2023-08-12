import { CDBIcon } from "cdbreact";
import { useState } from "react";
import { Link } from 'react-router-dom'
import '../css/Orders.css'

export const Orders = () => {

    const [orders, setOrders] = useState([
        {
            orderID: "0001",
            customerName: "Mark Otto",
            total: 50.00,
            status: "Pending",
            orderDate: "2023-08-01"
        },
        {
            orderID: "0002",
            customerName: "Jacob Thorton",
            total: 120.00,
            status: "Complete",
            orderDate: "2023-08-02"
        },
        {
            orderID: "0003",
            customerName: "Larry Benson",
            total: 340.50,
            status: "Cancelled",
            orderDate: "2023-08-03"
        },

    ])

    return (
        <div className="w-100 vh-100 canvas-container">
            <h1>Orders</h1>


            <div className="container bg-white">
                <Link to='/add-order'>
                    <button className="btn btn-primary mb-4 ">
                        Add Order
                    </button>
                </Link>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#OrderID</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Date</th>
                            <th scope="col">Total</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            orders ?
                                orders.map(order => {
                                    return (
                                        < tr key={order.orderID}>
                                            <th scope="row">{order.orderID}</th>
                                            <td>{order.customerName}</td>
                                            <td>{order.orderDate}</td>
                                            <td>${order.total}</td>
                                            <td>{order.status}</td>
                                            <Link to={`/orders-details/${order.orderID}`}>
                                                <td><button className="btn btn-info">Details</button></td>
                                            </Link>
                                        </tr>
                                    )
                                })
                                :
                                <p>There are no orders.</p>
                        }
                    </tbody>
                </table>

            </div>

        </div >
    );
}