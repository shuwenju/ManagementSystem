import {useState} from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";
import Swal from "sweetalert2";

export const OrderEdit = ({orderId, orderStatus, setOrderEdit, fetchOrdersList}) => {
    const [status, setStatus] = useState(orderStatus);
    const location = useLocation();

    const updateOrderStatus = async (newStatus, withEmail = false) => {
        try {
            // Retrieve the JWT token from local storage
            const token = localStorage.getItem('jwtToken');

            await axios.put(`https://localhost:44343/api/Orders/${orderId}`,
                {
                    status: newStatus
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    params: {
                        cancelEmail: withEmail
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

    async function handleChange(event) {
        const newStatus = event.target.value;
        setStatus(newStatus);
        if (newStatus === 'Cancelled') {
            const result = await showAlertMsg()
            if (!result.isConfirmed) {
                setOrderEdit({id: orderId, edit: false});
                return;
            }
            if (result.value) {
                await updateOrderStatus(newStatus, true);
                return;
            }
        }
        await updateOrderStatus(newStatus);
    }

    const showAlertMsg = () => {
        return Swal.fire({
            text: "Are you sure you want to cancel this order?",
            icon: 'warning',
            input: 'checkbox',
            inputValue: 0,
            inputPlaceholder: 'send a cancellation email to customer',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
        });
    }

    return (
        <select className="form-select form-select-sm w-100"
                value={status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Complete">Complete</option>
            <option value="Cancelled">Cancelled</option>
        </select>
    );
}