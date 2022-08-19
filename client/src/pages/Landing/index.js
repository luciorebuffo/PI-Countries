import React, { useState } from "react";
import style from"./landing.module.css";
import { Link } from "react-router-dom";


function LandingPage(){



    return (
        <div className = {style.container}>
                    <div className ={style.title}>
                        <h1 className ={style.h1}>Welcome to</h1>
                        <h1 className ={style.h1}>Henry Countries</h1>
                    </div>
                    <div className = {style.btnWrapper}>
                    <Link to = "/countries">
                        <button
                            className = {style.btnEnter}
                        >ENTER
                        </button>
                    </Link>
                    </div>       
        </div>
    )
}

export default LandingPage;


