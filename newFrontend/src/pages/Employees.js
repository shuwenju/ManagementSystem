import EmployeesList from "./EmployeesList";
import { useState } from "react";
export const Employees = (props) => {
   

    return (
        <div className="wrapper">
            
            <EmployeesList employees={props.employees} setEmployees={props.setEmployees} />

        </div>
    );
}