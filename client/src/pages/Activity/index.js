import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { postActivity } from "../../actions";
import reducer from "../../reducer";
import style from"./activity.module.css";

function Activity()
{
    let allCountries = useSelector((store) => store.countries);

    function setDif(event){
        document.getElementById("rangeDifValue").innerText = event.target.value;
    }
    function setDuration(event){
        document.getElementById("rangeDurationValue").innerText = event.target.value;
    }    
    function setSeason(event)
    {
        switch (event.target.value) {
            case "SUMMER":
                
                if(event.target.classList.contains(style.notSelected)){
                    event.target.classList.remove(style.notSelected);
                }
                else{
                    event.target.classList.add(style.notSelected);
                }
                break;
            case "SPRING":
                if(event.target.classList.contains(style.notSelected)){
                    event.target.classList.remove(style.notSelected);
                }
                else{
                    event.target.classList.add(style.notSelected);
                }
                
                break;
            case "AUTUMN":
                if(event.target.classList.contains(style.notSelected)){
                    event.target.classList.remove(style.notSelected);
                }
                else{
                    event.target.classList.add(style.notSelected);
                }
                
                break;
            case "WINTER":
                if(event.target.classList.contains(style.notSelected)){
                    event.target.classList.remove(style.notSelected);
                }
                else{
                    event.target.classList.add(style.notSelected);
                }
                
                break;
        
            default:
                break;
        }
    }


    return (
        <div className={style.Container}>       
                <form className = {style.form}>
                    <div className={style.divTitle}>
                        <p className={style.myTitle}>Create new Activity</p>
                    </div>
                    <div className={style.fullForm}>
                        
                        <div className={style.divData}>
                            
                            <input className={style.txtName} type = "text" placeholder="Activity name" maxLength="25"></input><br/>
                            
                            <div className={style.divDificultad}>
                                <p className={style.dificultadTitle}>Difficulty: </p>
                                <input className={style.rangeDificultad} type="range" min = "1" max = "5" onChange={setDif}></input>
                                <p className={style.rangeDifValue} id="rangeDifValue">5</p>
                            </div>

                            
                            <div className={style.divDuracion}>
                                <p className={style.durationTitle}>Duration: </p>
                                <input className={style.rangeDuracion} type="range" min = "1" max = "8" onChange={setDuration}></input>
                                <p className={style.rangeDuracionValue} id="rangeDurationValue">8</p>
                            </div>
                            
                            <p className={style.seasonTitle}>Select Season</p>
                            <div className={style.btnControl}>
                                <input type= "button" className={`${style.btnSummer} ${style.notSelected}`} value="SUMMER" onClick={setSeason}></input>
                                <input type= "button" className={`${style.btnSpring} ${style.notSelected}`} value="SPRING" onClick={setSeason}></input>
                                <input type= "button" className={`${style.btnAutumn} ${style.notSelected}`} value="AUTUMN" onClick={setSeason}></input>
                                <input type= "button" className={`${style.btnWinter} ${style.notSelected}`} value="WINTER" onClick={setSeason}></input>
                            </div>

                            <p className={style.selectCountryTitle}>Select Country</p>
                            <div className={style.selectControl}>
                                <select className={style.selectCountries} id="countries" multiple>
                                    {allCountries && allCountries.map((c) => (
                                    <option
                                        key={c.id}
                                        value={c.name} 
                                        className={style.optionCountry}        
                                    >
                                        {c.name}
                                    </option>
                                    ))}
                                </select>
        
                            </div>

                        </div>
                        <div className={style.divList}>
                            
                        

                        </div>
                    </div>
                    <div className={style.btnCreateContainer}>
                        <button className={style.btnCreate}>
                        CREATE
                        </button>
                    </div>
                </form>
                
        </div>
    )
}

export default Activity;