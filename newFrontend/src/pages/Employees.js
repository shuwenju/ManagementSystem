import EmployeesList from "./EmployeesList";
import { useState } from "react";
export const Employees = (props) => {
    const [employees, setEmployees] = useState([
        { fName: "huang", lName: "danli", email: "danli@gmail.com" },
    ]);

    return (
        <div className="wrapper">
            
            <EmployeesList employees={employees} setEmployees={setEmployees} />

        </div>
    );
}