import EmployeesList from "./EmployeesList";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
export const Employees = () => {
    const [employees, setEmployees] = useState([
    ]);
    useEffect(() => {
        axios.get("https://localhost:44343/api/Authentication/users")
            .then(response => {
                setEmployees(response.data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

  
    return (
        <div className="wrapper">
            
            <EmployeesList employees={employees} setEmployees={setEmployees} />

        </div>
    );
}