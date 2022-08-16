import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";


function Navbar(){
    return (
        <div className = "Nav">
            <NavLink className = "NavLink" to = "/">HenryCountries</NavLink>
            <NavLink className = "NavLink" to = "/countries">Countries</NavLink>
            <NavLink className = "NavLink" to = "/activity/create">Create Activity</NavLink>
        </div>
    )
}

export default Navbar;