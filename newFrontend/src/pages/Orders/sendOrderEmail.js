import {useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";

const SendOrderEmail = ({id, customer}) => {
    const [isChecked, setIsChecked] = useState(false)

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('jwtToken');
            await axios.get(`https://localhost:44343/api/Orders/${id}/sendEmail`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            await Swal.fire({
                icon: "success",
                text: "Order Details has been send to customer"
            });
            setIsChecked(false);
        } catch (error) {
            console.error("Error sending email: ", error);
            await Swal.fire({
                icon: "error",
                text: "Error sending email!"
            })
        }
    }

    return (
        <form className="row g-3 mt-4" onSubmit={handleOnSubmit}>
            <div className="col-12">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox"
                           checked={isChecked}
                           onChange={() => setIsChecked(!isChecked)}/>
                    <label className="form-check-label">
                        Send this order details to {customer.name}
                    </label>
                </div>
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-primary" disabled={!isChecked}>Send</button>
            </div>
        </form>
    );
};

export default SendOrderEmail;