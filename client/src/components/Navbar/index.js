import React from "react";
import { NavLink } from "react-router-dom";
import style from "./navbar.module.css";


function Navbar(){
    return (
        <div className = {style.Nav}>
            <NavLink className = {style.NavLink} to = "/">HenryCountries</NavLink>
            <NavLink className = {style.NavLink} to = "/countries">Countries</NavLink>
            <NavLink className = {style.NavLink} to = "/activity">Create Activity</NavLink>
        </div>
    )
}

export default Navbar;