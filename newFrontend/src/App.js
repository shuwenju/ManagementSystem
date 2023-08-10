import React, {useState} from 'react';
import './css/App.css';
import Navbar from "./components/Navbar";
import AdminPanel from "./Panels/AdminPanel";
import UserPanel from "./Panels/UserPanel";

function App() {
    const [sidebarToggled, setSidebarToggled] = useState(false);
    const [isAdmin, setIsAdmin] = useState(true);

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
