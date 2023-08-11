import React, {useState} from 'react';
import './css/App.css';
import Navbar from "./components/Navbar";
import AdminPanel from "./Panels/AdminPanel";
import UserPanel from "./Panels/UserPanel";

function App() {
    const [sidebarToggled, setSidebarToggled] = useState(false);
    const [isAdmin, setIsAdmin] = useState(true);

    const Const_Email = "manal@gmail.com";
    const Const_Pass = "123123";
  
    const [currentIndex, setCurrentIndex] = useState(null);

    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [salary, setSalary] = useState("");
    const [date, setDate] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPass, setUserPass] = useState("");
    const [isUser, setIsUser] = useState(false);
    const [displayForm, setDisplayForm] = useState(false);
    // Render function for the EmployeeList component
  
  



    return (
        <>
            <Navbar onToggleSideBar={() => setSidebarToggled(!sidebarToggled)}/>
            {
                isAdmin ?
                    <AdminPanel sidebarToggled={sidebarToggled}/> :
                    <UserPanel sidebarToggled={sidebarToggled}/>
            }
        </>
    );
}

export default App;
