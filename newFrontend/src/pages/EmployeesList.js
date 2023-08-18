import React from "react";
import EmployeeRow from "./EmployeeRow";
import { Link } from "react-router-dom";
import "../css/EmployeesList.css";
import { useState } from "react";
function EmployeesList({ employees }) {

 
  const roleOptions = ["Admin", "User"];

  const [selectedRoles, setSelectedRoles] = useState({});

  const handleRoleChange = (employeeIndex, role) => {
    setSelectedRoles((prevSelectedRoles) => ({
      ...prevSelectedRoles,
      [employeeIndex]: role,
    }));
  };




  return (
    <div className="canvas-container">
      <div className="button-container">
        {/* Add Employee button */}
        <Link to="/admin/add-employee">
          <button className="blue-button">Add Employee</button>
        </Link>
      </div>
      <div className="container">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Username</th>
              <th scope="col">FirstName</th>
              <th scope="col">LastName</th>
              <th scope="col">Email</th>
              <th scope="col">RoleType</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
                
            
            </tr>
          </thead>
          <tbody>
            {employees.map((row, index) => (
              <EmployeeRow
                key={`${row.email}_${index}`}
                employee={row}
                index={index}
                // edit={edit}
                // deleteEmployee={deleteEmployee}
                selectedRole={selectedRoles[index]}
                onRoleChange={handleRoleChange}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeesList;