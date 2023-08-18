import React from "react";
import {
  // CDBTable,
  // CDBTableHeader,
  // CDBTableBody,
  // CDBContainer,
  CDBIcon,
} from "cdbreact";
import axios from "axios";

const handleEdit = (customer) => {
console.log("hello");
};
const handleDelete = async (customerId) => {
  try {
    // Ask for confirmation before proceeding
    const shouldDelete = window.confirm("Are you sure you want to delete this record?");

    if (!shouldDelete) {
      return; // If user cancels deletion, exit the function
    }

    const token = localStorage.getItem('jwtToken');
    await axios.delete(`https://localhost:44343/api/Authentication/${customerId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // After successful deletion, refresh the list of items
    // getItems();
  } catch (error) {
    console.error(error);
  }
};




function EmployeeRow({ employee, index, edit, deleteEmployee }) {
  return (
    <tr key={`${employee.email}_${index}`}>
      <th scope="row">{index + 1}</th>
      <td>{employee.userName}</td>
      <td>{employee.firstName}</td>
      <td>{employee.lastName}</td>
      <td>{employee.email}</td>
      <td>{employee.roleType}</td>
      

      <td>
                    <CDBIcon
                      fas
                      icon="edit"
                      style={{ color: "orange", cursor: "pointer" }}
                      onClick={() => handleEdit(employee)}
                    />
                  </td>
                  <td>
                    <CDBIcon
                      fas
                      icon="trash"
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => handleDelete(employee.id)}
                    />
                  </td>

    </tr>
  );
}

export default EmployeeRow;
