import React from "react";

function EmployeeRow({ employee, index, edit, deleteEmployee }) {
  return (
    <tr key={`${employee.email}_${index}`}>
      <th scope="row">{index + 1}</th>
      <td>{employee.fName}</td>
      <td>{employee.lName}</td>
      <td>{employee.email}</td>
      <td>{employee.role}</td>
      <td>{employee.etc}</td>

    </tr>
  );
}

export default EmployeeRow;
