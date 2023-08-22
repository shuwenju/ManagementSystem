import moment from "moment";
import {OrderEdit} from "./OrderEdit";
import {CDBIcon} from "cdbreact";
import {NavLink} from "react-router-dom";

const OrderRow = ({order, orderEdit, setOrderEdit, fetchOrdersList, routePath}) => {

    return (
        <tr className="align-middle">
            <th scope="row">{order.id}</th>
            <td>{order.customer.name}</td>
            <td>{moment(order.createdAt).format('YYYY-MM-DD')}</td>
            <td>{`${order.applicationUser.firstName} ${order.applicationUser.lastName}`}</td>
            <td>${order.crossAmount}</td>
            <td>{order.customer.address}</td>
            {
                order.id === orderEdit.id && orderEdit.edit ?
                    <td>
                        <OrderEdit
                            orderId={order.id}
                            orderStatus={order.orderStatus}
                            setOrderEdit={setOrderEdit}
                            fetchOrdersList={fetchOrdersList}
                        />
                    </td>
                    :
                    <td className={order.orderStatus === "Pending" ? "text-warning"
                        : order.orderStatus === "Cancelled" ? "text-danger"
                            : order.orderStatus === "Shipped" ? "text-info" : "text-success"}>
                        {order.orderStatus}
                    </td>
            }
            <td>
                <a href="/#" className="text-warning me-1"
                   onClick={e => {
                       e.preventDefault();
                       setOrderEdit({id: order.id, edit: true})
                   }}>
                    <CDBIcon fas icon="edit"/>
                </a>
                <NavLink to={`${routePath}/orders/details/${order.id}`}>
                    <CDBIcon fas icon="eye"/>
                </NavLink>
            </td>
        </tr>
    );
};

export default OrderRow;