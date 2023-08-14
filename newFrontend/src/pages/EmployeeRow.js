import React from "react";

function EmployeeRow({ employee, index, edit, deleteEmployee }) {
  return (
    <tr key={`${employee.email}_${index}`}>
      <th scope="row">{index + 1}</th>
      <td>{employee.userName}</td>
      <td>{employee.firstName}</td>
      <td>{employee.lastName}</td>
      <td>{employee.email}</td>
      <td>{employee.etc}</td>

    </tr>
  );
}

export default EmployeeRow;
