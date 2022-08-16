import React from "react";
import "./card.css";

function Card({id,name,img,continents,subregion,capital,population,area}){

    return (
        <div className="Card">
            <div className="card-container" id = {id}>
                
                <p className="name">{name}</p>
                <img className="card-img" src={img} alt="img not found"/>  
                            
                <p>Continent: {continents}</p>
                <p>Subregion: {subregion}</p>
                <p>Capital: {capital}</p>
                <p>Population: {population}</p>
                <p>Area: {area}</p>
            </div>
        </div>
    )

}

export default Card;