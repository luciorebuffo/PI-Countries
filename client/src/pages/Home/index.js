import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Countries from "../Countries";


function Home() {


    return (
        
        <>
            
            <Navbar></Navbar>
            <Switch>
                <Route path="/countries"  component={Countries}/>
            </Switch>
        </>
    )

}

export default Home;