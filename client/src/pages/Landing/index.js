import React, { useState } from "react";
import "./landing.css";
import { Link } from "react-router-dom";


function LandingPage(){

    return (
        <div className = "container">
            <div className = "content">
                
                    <div className ="title">
                        <h1>Welcome to</h1>
                        <h1>Henry Countries</h1>
                    </div>
                    <div className = "btnWrapper">
                    <Link to = "/countries">
                        <button
                            className = "btnEnter"
                        >ENTER
                        </button>
                    </Link>
                    </div>
                
            </div>
        </div>
    )
}

export default LandingPage;


