import OrderRow from "./OrderRow";
import {useState} from "react";

const OrderTable = ({orders, fetchOrdersList, filterText, routePath}) => {
    const [orderEdit, setOrderEdit] = useState({
        id: "",
        edit: false
    });

    const rows = orders.reduce((result, order) => {
        if (!order.customer.name.toLowerCase().includes(filterText.toLowerCase()) && order.id !== Number(filterText)) {
            return result;
        }
        const orderRow = <OrderRow key={order.id}
                                   order={order}
                                   orderEdit={orderEdit}
                                   setOrderEdit={setOrderEdit}
                                   fetchOrdersList={fetchOrdersList}
                                   routePath={routePath}/>;
        return [...result, orderRow];
    }, []);

    return (
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
            {rows}
            </tbody>
        </table>
    );
};

export default OrderTable;