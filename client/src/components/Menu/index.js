import React from "react";
import style from "./menu.module.css";
import img from "../../images/icon-glass.png";

function Menu({buscar, filterContinent, ordenar}){

    return (
        <div className={style.divMenu}>
            <div className={style.searchbarContainer}>
                <input className={style.searchbar} type="text" placeholder="Country"></input>
                <div className={style.btnSearchbar} /*onClick={() => buscar()}*/><img className={style.imgSearchbar} src={img}></img></div>
            </div>
            <div className={style.filtroContainer}>
                <select className = {style.select}onChange={(event) => filterContinent(event)}>
                    <option value="All">All</option>
                    <option value="Africa">Africa</option>
                    <option value="America">America</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select>
            </div>
            <div className={style.ordenamientoContainer}>
                <select className = {style.select} defaultValue="" onChange={(event) => ordenar(event)}>
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
                <input className={style.searchbar} type="text" placeholder="Activity"></input>
                <div className={style.btnSearchbar} /*onClick={() => buscar()}*/><img className={style.imgSearchbar} src={img}></img></div>
            </div>
        </div>
    )

}

export default Menu;