import React from "react";
import {
  CDBIcon,
  CDBModal,
  CDBModalHeader,
  CDBModalBody,
  CDBModalFooter,
} from "cdbreact";

import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";

function EmployeeRow({ employee, index, onEmployeeUpdated }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState({ ...employee });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleEdit = () => {
    toggleModal();
  };

  /*const handleUpdate = async (userName) => {
    try {
      // Update employee logic here using axios
      
      // Close modal after successful update
      toggleModal();
      // Refresh employee list
      onEmployeeUpdated(userName);
    } catch (error) {
      console.error(error);
    }
  };*/

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee((prevEmployee) => ({ ...prevEmployee, [name]: value }));
  };


  const handleEditUpdate = async (employee) => {
    try {
      // Update employee logic here using axios
      const token = localStorage.getItem("jwtToken");
      const response = await axios.put(
        `https://localhost:44343/api/Employee/blockout2/${employee.userName}`,
        {
          // Pass updated employee data here
          userName: employee.userName,
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          // Other properties
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Check the response status or other conditions to determine if the update was successful
      if (response.status === 200) {
        // Close modal after successful update
       // this.toggleModal();
        // Refresh employee list
       // this.props.onEmployeeUpdated(employee);
     
       window.location.href = "http://localhost:3000/admin/employees";
      
      
      } else {
        // Handle error or show error message
        console.error("Update failed");
      }
    } catch (error) {
      console.error(error);
    }
  };
  


  const handleUpdate = async (userName) => {
    try {
      // Ask for confirmation before proceeding
      const shouldDelete = window.confirm(
        "Are you sure you want to delete this record?"
      );

      if (!shouldDelete) {
        return; // If user cancels deletion, exit the function
      }

      console.log("haha");
      console.log(userName);
      const token = localStorage.getItem("jwtToken");
      await axios.post(
        `https://localhost:44343/api/Employee/blockout/${userName}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // After successful deletion, refresh the list of items
      onEmployeeUpdated(userName);
      // getItems();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <tr key={`${employee.email}_${index}`}>
      <th scope="row">{index + 1}</th>
      <td>{employee.userName}</td>
      <td>{employee.firstName}</td>
      <td>{employee.lastName}</td>
      <td>{employee.email}</td>
      <td>{employee.roleType}</td>
      <td hidden>{employee.isLocked}</td>

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
          onClick={() => handleUpdate(employee.userName)}
        />
      </td>

      {/* Edit Modal */}
      <CDBModal isOpen={isModalOpen} toggle={toggleModal}>
        <CDBModalHeader toggle={toggleModal}>Edit Employee</CDBModalHeader>
        <CDBModalBody>
          {/* Edit form here */}

          <table className="tabletable-hover">
              <tr>
                <th scope="col">Username :</th>
                <td>
                {editedEmployee.userName}
               </td>
              </tr>
              <tr>
                <th scope="col">FirstName</th>
                <th scope="col">LastName</th>
                <th scope="col">Email</th>
              </tr>
              <tr>
                <td>
            
                  <input
                    type="text"
                    name="firstName"
                    value={editedEmployee.firstName}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
             
              <input
                type="text"
                name="lastName"
                value={editedEmployee.lastName}
                onChange={handleInputChange}
              />
           
            </td>
            <td>
              <input
                type="text"
                name="email"
                value={editedEmployee.email}
                onChange={handleInputChange}
              />
            </td>
            </tr>
          </table>
          {/* Other input fields */}
        </CDBModalBody>
        <CDBModalFooter>
          <button onClick={() => handleEditUpdate(editedEmployee)}>
            Confirm Edit
          </button>
        </CDBModalFooter>
      </CDBModal>
    </tr>
  );
}

export default EmployeeRow;
