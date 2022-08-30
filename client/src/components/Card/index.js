import React from "react";
import { Link } from "react-router-dom";
import style from "./card.module.css";

function Card({id,name,img,continents}){

    return (
        <div className={style.Card}>
            <div className={style.cardContainer} id = {id}>           
                <img className={style.cardImg} src={img} alt="img not found"/>
                <div className={style.cardDescriptionBk}></div>
                <div className={style.cardDescription}>
                    <p className={`${style.name} ${style.p}`}>{name}</p>         
                    <p className={style.p}>Continent: {continents}</p> 
                    <Link to = {`/country/${id}`}>
                        <input className={style.btnDetails}type= "button" value= "DETAILS" ></input>
                    </Link>               
                </div>
            </div>
        </div>
    )

}

export default Card;