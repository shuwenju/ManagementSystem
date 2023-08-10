import React from "react";
import '../css/SideBar.css';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarMenu,
    CDBSidebarMenuItem
} from "cdbreact";
import {NavLink} from "react-router-dom";

const UserSidebar = ({toggled}) => {

    return (
        <div className="d-flex h-100">
            <CDBSidebar textColor="#fff" backgroundColor="#333"
                        toggled={toggled}
            >
                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <NavLink to="/" className={({isActive}) => isActive ? "activeClicked" : ''}>
                            <CDBSidebarMenuItem icon="home">Dashboard</CDBSidebarMenuItem>
                        </NavLink>

                        <NavLink to="/customers" className={({isActive}) => isActive ? "activeClicked" : ''}>
                            <CDBSidebarMenuItem icon="people-arrows">Customers</CDBSidebarMenuItem>
                        </NavLink>

                        <NavLink to="/products" className={({isActive}) => isActive ? "activeClicked" : ''}>
                            <CDBSidebarMenuItem icon="shapes">Products</CDBSidebarMenuItem>
                        </NavLink>

                        <NavLink to="/orders" className={({isActive}) => isActive ? "activeClicked" : ''}>
                            <CDBSidebarMenuItem icon="box">Orders</CDBSidebarMenuItem>
                        </NavLink>

                        <NavLink to="/reports" className={({isActive}) => isActive ? "activeClicked" : ''}>
                            <CDBSidebarMenuItem icon="table">Reports</CDBSidebarMenuItem>
                        </NavLink>

                        <NavLink to="/setting" className={({isActive}) => isActive ? "activeClicked" : ''}>
                            <CDBSidebarMenuItem icon="cog">Setting</CDBSidebarMenuItem>
                        </NavLink>

                    </CDBSidebarMenu>
                </CDBSidebarContent>

            </CDBSidebar>
        </div>
    );
}

export default UserSidebar;
