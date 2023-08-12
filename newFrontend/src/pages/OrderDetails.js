import '../css/Orders.css'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
export const OrderDetails = () => {

    const { id } = useParams()

    return (
        <div className="wrapper">
            <h1>Order Details for OrderID: {id} </h1>
            <Link to="/orders" >
                <button className="btn btn-info">
                    Back to Orders List
                </button>
            </Link>
        </div>
    );
}