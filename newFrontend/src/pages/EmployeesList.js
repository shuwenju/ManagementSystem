import React from "react";
import EmployeeRow from "./EmployeeRow";
import { Link } from "react-router-dom";
import "../css/EmployeesList.css";

function EmployeesList({ employees }) {
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
              <th scope="col">Etc</th>
            
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
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeesList;