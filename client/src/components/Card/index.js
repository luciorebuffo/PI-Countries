import React from "react";
import "./card.css";

function Card({id,name,img,continents,subregion,capital,population,area}){

    return (
        <div className="Card">
            <div className="card-container" id = {id}> 
                
                <img className="card-img" src={img} alt="img not found"/>
                <div class="card-description-bk"></div>
                <div className="card-description">
                    <p className="name">{name}</p>         
                    <p>Continent: {continents}</p>
                    
                </div>
            </div>
        </div>
    )

}

export default Card;