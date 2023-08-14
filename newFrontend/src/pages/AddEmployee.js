import EmployeesList from "./EmployeesList";
import { useState } from "react";
import EmployeeForm from "./EmployeeForm";
import RegistrationForm from "./RegistrationForm";
export const AddEmployee = (props) => {

    return (
        <div className="wrapper">
            
            <EmployeeForm addEmployee={props.addEmployee} />
            {/* <RegistrationForm /> */}
        </div>
    );
}