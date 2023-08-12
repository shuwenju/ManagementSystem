import {CDBIcon} from "cdbreact";
import {NavLink} from "react-router-dom";

const Navbar = ({onToggleSideBar}) => {

    return (
        <nav className="navbar navbar-expand-md text-light" style={{background: "#c84042"}}>
            <div className="container">
                <NavLink className="navbar-brand" to="/">
                    <img alt="logoImage" src="/img/goat-head.png" style={{width: "3.5rem", height: "3.5rem"}}/>
                </NavLink>
                <CDBIcon fas icon="bars" size="lg" style={{cursor: 'pointer', marginLeft: '5rem'}}
                         onClick={onToggleSideBar}/>
                <ul className="navbar-nav ms-auto align-items-center">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/setting">
                            <img alt="panelImage" src="/img/profile.png" style={{width: "3rem", height: "3rem"}}/>
                            <span className="text-light ms-1">Matthew Parker</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-light" href="/">
                            <CDBIcon fas icon="power-off" size="lg"/>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
