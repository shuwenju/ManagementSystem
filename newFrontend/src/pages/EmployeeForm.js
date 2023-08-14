import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "./EmployeeForm.css";
import axios from "axios";

// danli_employeeAdd_layout_20230810
const EmployeeForm = ({ addEmployee }) => {

  const [sendEmail, setSendEmail] = useState(false);

  const handleCheckboxChange = () => {
    setSendEmail(!sendEmail);

  };

  const navigate = useNavigate(); //
  const [username, setUsername] = useState("");
  // const [role, setRole] = useState("");
   const [firstname, setFirstname] = useState("");
   const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

// danli_employeeAdd_layout_20230810
  const handleSubmit =async (e) => {
    e.preventDefault();

    const newEmployee = {
      username,
 //     role,
      firstname,
      lastname,
      email,
      password,

    };
    try{      
			// Retrieve the JWT token from local storage
			const token = localStorage.getItem('jwtToken'); // Replace 'yourTokenKey' with your actual token key
      console.log("New Employee Data =>");
      newEmployee.password="Danli-123";
      console.log(newEmployee);

			const response = await axios.post(
				
        'https://localhost:44343/api/authentication/register', newEmployee,
				{
					headers: {
						Authorization: `Bearer ${token}` // Include the token in the 'Authorization' header
					}
				}
		)
  
  
    console.log(response.data);
  
  } catch(error){
			console.log(error)
		}



// try{
//        console.log("New Employee Data =>");
//        newEmployee.password="Danli-123";
//        console.log(newEmployee);
//        const response = await axios.post('https://localhost:44343/api/authentication/register', newEmployee);
//        console.log(response.data);
//      } catch (error) {
//        console.error(error.response.data);
//      }
//   ;

    // Clear form inputs
    setUsername("");

    //  setFName("");
    //setLName("");
    setEmail("");
    console.log("jjjjjj");
    navigate("/admin/employees");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2 className="add_new_employee_header">Add New Employee</h2>
        <div className="user_info">
          <div className="user_detail">
            <div className="user_detail_header">
              <h3> User details:</h3>
            </div>
            <div className="user_table">
              <table>
                <tr>
                  <td>Username*</td>
                  <td>Role</td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="text"
                      id="userName"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </td>
                  {/* <td>
                    <input
                      type="text"
                      id="lName"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                    />
                  </td> */}
                </tr>
                <tr>
                  <td colSpan="2">
                   
                    <label htmlFor="email">Email*</label>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <input 
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label >First Name</label>
                  </td>
                  <td>
                    <label >Last Name</label>
                  </td>
                </tr>
                <tr>
                  <td>
                   
                    <input
                      type="text"
                      id="fName"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      required
                    />
                  </td>
                  <td>
                   <input
                      type="text"
                      id="LName"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <input
                      type="checkbox"
                      checked={sendEmail}
                      onChange={handleCheckboxChange}
                    />
                    Send email confirmation
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="user_photo">
            <div className="photo_header">
              <h3> Profile Picture</h3>
            </div>
            <div >
                <img className="picture" src="/img/Employee_photo_1.jpg" alt="person_img"></img>
            </div>
            <button className="image_button"> Select Image</button>
          </div>
        </div>


                <div className="user_confirmation">
                    <button type="submit" className="user_button" _>Add Employee</button>
                    <Link to="/admin/employees">Cancel</Link>
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;
