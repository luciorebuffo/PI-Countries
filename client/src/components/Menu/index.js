import React, { useState } from "react";
import style from "./menu.module.css";
import img from "../../images/icon-glass.png";

function Menu({byName, nameOnClick, filterContinent, ordenar, byActivity, activityOnClick, reset}){

    

    return (
        <div className={style.divMenu}>
            <div className={style.searchbarNameContainer}>
                <div className={style.btnSearchbarName} onClick={nameOnClick}><img className={style.imgSearchbarName} src={img}></img></div>
                <input id = "inputName" className={style.searchbarName} type="text" placeholder="Country" onChange={(event) => byName(event)}></input>
            </div>
            <div className={style.filtroContainer}>
                <select id="selectContinent" className = {style.select} onChange={(event) => filterContinent(event)}>
                    <option value="All">All</option>
                    <option value="Africa">Africa</option>
                    <option value="America">America</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                    <option value="Antarctic">Antarctic</option>
                </select>
            </div>
            <div className={style.ordenamientoContainer}>
                <select id="selectOrder"className = {style.select} defaultValue="" onChange={(event) => ordenar(event)}>
                    <option disabled value="">
                        --Chose one--
                    </option>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                    <option value="maxPop">Max Population</option>
                    <option value="minPop">Min Population</option>
                </select>
            </div>
            <div className={style.searchbarContainer}>
                <input id = "inputActivity" className={style.searchbar} type="text" placeholder="Activity" onChange={(event) => byActivity(event)}></input>
                <div className={style.btnSearchbar} onClick={activityOnClick}><img className={style.imgSearchbar} src={img}></img></div>
            </div>
            <div className={style.divReset}>
                <input className = {style.btnReset} type ="button" value="RESET" onClick={reset}></input>

            </div>
        </div>
    )

}

export default Menu;