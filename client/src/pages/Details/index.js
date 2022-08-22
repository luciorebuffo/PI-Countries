import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import style from "./details.module.css";
import { getCountryByPk } from "../../actions";
import { cleanCountryByPk } from "../../actions";


function Details() {

    const {id} = useParams()

    const dispatch = useDispatch();
    
    let country = useSelector(store => store.country);

   

    useEffect(() => {

        dispatch(getCountryByPk(id));
        

        return () => {
            // Component unmount.
            dispatch(cleanCountryByPk());
        }

    }, [dispatch]);

    return (
        
        <div className = {style.container}>
            <div className = {style.cardDetails}>
                    <div className = {style.containerDetails}>
                        <div className={style.containerIMG}>
                            <img className={style.detailImg} src={country.flags} alt="img not found"></img>
                        </div>
                        <div className={style.containerData}>
                            <p className={style.dataName}>{country.name}</p>
                            <p className={style.dataContinent}>Continent: {country.continents}</p>
                            <p className={style.dataCapital}>Capital: {country.capital}</p>
                            <p className={style.dataSubregion}>Subregion: {country.subregion}</p>
                            <p className={style.dataArea}>Area: {country.area}</p>
                            <p className={style.dataPopulation}> Population: {country.population}</p>                     
                        </div>
                    </div>
            </div>
            {country.activities && country.activities.map(a =>
                <>
                    <div className={style.containerActivity}>
                        <div className={style.containerActivityData}>
                            <p className={style.name}>{a.name}</p>
                            <p className={style.difficulty}>Difficulty: {a.difficulty}</p>   
                            <p className={style.duration}>Duration: {a.duration}</p>
                        </div>                   
                        
                        <p className = {style.season}>{a.season.join(", ")}</p>
                        
                    </div>
                </>                 
            )
            }   
        </div>
    )

}

export default Details;