import React from "react";
import EmployeeRow from "./EmployeeRow";
import { Link } from "react-router-dom";
import "../css/EmployeesList.css";
import { useState, useEffect } from "react"; // Import useEffect here
import axios from "axios";

function EmployeesList({ initialEmployees }) { // Change the parameter name to initialEmployees

  const [employees, setEmployees] = useState([]); // Change the state variable name to employees

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("https://localhost:44343/api/Employee/users");
      const filteredEmployees = response.data.filter(employee => employee.isLocked !== "1");
      setEmployees(filteredEmployees);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmployeeUpdated = (updatedEmployeeName) => {
    // Update the employees state by filtering out the employee with the updated username
    setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.userName !== updatedEmployeeName));
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
              <th hidden scope="col">Deleted</th>
              
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
         
                onEmployeeUpdated={handleEmployeeUpdated}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export default EmployeesList;
