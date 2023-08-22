import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ProfileForm = () => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: ""
    });

    const fetchUserData = useCallback(async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await axios.get("https://localhost:44343/api/Profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }, []);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('jwtToken');
            await axios.post("https://localhost:44343/api/Profile", user, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            await Swal.fire({
                icon: "success",
                text: "Profile has been update successfully"
            });
        } catch (error) {
            console.error("Error fetching data: ", error);
            await Swal.fire({
                icon: "error",
                text: "Error updating profile!"
            })
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="row mb-3">
                <label className="col-sm-5 col-md-4 col-lg-3 col-xl-2 col-form-label fw-semibold">First Name</label>
                <div className="col-sm-7 col-md-6 col-lg-4 col-xl-3">
                    <input type="text" className="form-control"
                           value={user.firstName} onChange={e => setUser({...user, firstName: e.target.value})}/>
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-sm-5 col-md-4 col-lg-3 col-xl-2 col-form-label fw-semibold">Last Name</label>
                <div className="col-sm-7 col-md-6 col-lg-4 col-xl-3">
                    <input type="text" className="form-control"
                           value={user.lastName} onChange={e => setUser({...user, lastName: e.target.value})}/>
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-sm-5 col-md-4 col-lg-3 col-xl-2 col-form-label fw-semibold">Email</label>
                <div className="col-sm-7 col-md-6 col-lg-4 col-xl-3">
                    <input type="text" className="form-control" disabled
                           defaultValue={user.email}/>
                </div>
            </div>
            <button type="submit" className="btn btn-primary shadow" style={{width: 200}}>Save</button>
        </form>
    );
};

export default ProfileForm;