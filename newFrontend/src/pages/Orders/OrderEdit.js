import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";

export const OrderEdit = ({orderId, orderStatus, setOrderEdit, fetchOrdersList}) => {
    const [status, setStatus] = useState(orderStatus);
    const firstRender = useRef(true);
    const location = useLocation();

    async function handleChange(event) {
        try {
            // Retrieve the JWT token from local storage
            const token = localStorage.getItem('jwtToken');

            await axios.put(`https://localhost:44343/api/Orders/${orderId}`,
                {
                    status
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setOrderEdit({id: orderId, edit: false});
            location.state = {
                message: "Order Updated Successfully"
            };
            fetchOrdersList();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        handleChange();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    return (
        <select className="form-select form-select-sm w-100"
                value={status} onChange={(ev) => setStatus(ev.target.value)}>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Complete">Complete</option>
            <option value="Cancelled">Cancelled</option>
        </select>
    );
}