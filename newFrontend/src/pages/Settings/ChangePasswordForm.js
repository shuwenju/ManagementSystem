import {useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ChangePasswordForm = () => {
    const [userPass, setUserPass] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    });
    const [error, setError] = useState(null);
    let errorMsg
    if (error) {
        errorMsg = Object.values(error)[0];
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const token = localStorage.getItem('jwtToken');
            await axios.post("https://localhost:44343/api/Profile/changePassword", userPass, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            await Swal.fire({
                icon: "success",
                text: "Password has been update successfully"
            });
        } catch (error) {
            console.error("Error fetching data: ", error.response.data);
            error.response.data.errors ? setError(error.response.data.errors) : setError(error.response.data);
            await Swal.fire({
                icon: "error",
                text: "Error updating password!"
            })
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {
                error ? <p className="text-danger">{errorMsg}</p> : ""
            }
            <div className="row mb-3">
                <label className="col-sm-5 col-md-4 col-lg-3 col-xl-2 col-form-label fw-semibold">Current Password</label>
                <div className="col-sm-7 col-md-6 col-lg-4 col-xl-3">
                    <input type="text" className="form-control" value={userPass.currentPassword}
                           onChange={e => setUserPass({...userPass, currentPassword: e.target.value})}/>
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-sm-5 col-md-4 col-lg-3 col-xl-2 col-form-label fw-semibold">New Password</label>
                <div className="col-sm-7 col-md-6 col-lg-4 col-xl-3">
                    <input type="text" className="form-control" value={userPass.newPassword}
                           onChange={e => setUserPass({...userPass, newPassword: e.target.value})}/>
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-sm-5 col-md-4 col-lg-3 col-xl-2 col-form-label fw-semibold">confirm Password</label>
                <div className="col-sm-7 col-md-6 col-lg-4 col-xl-3">
                    <input type="text" className="form-control" value={userPass.confirmNewPassword}
                           onChange={e => setUserPass({...userPass, confirmNewPassword: e.target.value})}/>
                </div>
            </div>
            <button type="submit" className="btn btn-primary shadow" style={{width: 200}}>Change Password</button>
        </form>
    );
};

export default ChangePasswordForm;