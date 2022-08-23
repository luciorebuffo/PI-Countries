import React from "react";
import { NavLink } from "react-router-dom";
import style from "./navbar.module.css";
import img from "../../images/icon-travel.png";



function Navbar({buscar}){
    return (
        <div className = {style.Nav}>
            <NavLink className = {style.NavLink} to = "/"><img className = {style.NavImg} src={img}></img></NavLink>
            <NavLink className = {style.NavLink} to = "/countries">Countries</NavLink>
            <NavLink className = {style.NavLink} to = "/activity">Create Activity</NavLink>
        </div>
    )
}

export default Navbar;