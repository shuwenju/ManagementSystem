import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "./EmployeeForm.css";

const EmployeeForm = () => {
    const [employees, setEmployees] = useState([
        { fName: "huang", lName: "danli", email: "danli@gmail.com" },
    ]);
    const addEmployee = (newEmployee) => {
        setEmployees([...employees, newEmployee]);
        console.log(employees);
    };

    const [sendEmail, setSendEmail] = useState(false);
    const handleCheckboxChange = () => {
        setSendEmail(!sendEmail);
    };

    const navigate = useNavigate(); //
    const [userName, setUserName] = useState("");
    const [role, setRole] = useState("");

    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [email, setEmail] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();

        const newEmployee = {
            userName,
            role,
            fName,
            lName,
            email,
        };

        // Call the addEmployee function to add the new employee
        addEmployee(newEmployee);

        // Clear form inputs
        setUserName("");
        setFName("");
        setLName("");
        setEmail("");

        navigate("/employees");
    };

    return (
        <div className="em-container">
            <form onSubmit={handleSubmit}>
                <h2 className="add_new_employee_header">Add New Employee</h2>
                <div className="user_info">
                    <div className="user_detail">
                        <div className="user_detail_header">
                            <h3> User details:</h3>
                        </div>
                        <div className="user_table">
                            <table>
                                <tr>
                                    <td>Username*</td>
                                    <td>Role</td>
                                </tr>
                                <tr>
                                    <td>
                                        <input
                                            type="text"
                                            id="userName"
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            id="lName"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">

                                        <label htmlFor="email">Email*</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>First Name</label>
                                    </td>
                                    <td>
                                        <label>Last Name</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>

                                        <input
                                            type="text"
                                            id="fName"
                                            value={fName}
                                            onChange={(e) => setFName(e.target.value)}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            id="LName"
                                            value={lName}
                                            onChange={(e) => setLName(e.target.value)}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <input
                                            type="checkbox"
                                            checked={sendEmail}
                                            onChange={handleCheckboxChange}
                                        />
                                        Send email confirmation
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div className="user_photo">
                        <div className="photo_header">
                            <h3> Profile Picture</h3>
                        </div>
                        <div>
                            <img className="picture" src="/img/Employee_photo_1.jpg" alt="person_img"></img>
                        </div>
                        <button className="image_button"> Select Image</button>
                    </div>
                </div>

                <div className="user_confirmation">
                    <button type="submit" className="user_button" _>Add Employee</button>
                    <Link to="/employeeslist">Cancel</Link>
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;
