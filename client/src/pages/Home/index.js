import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Countries from "../Countries";
import Activity from "../Activity";
import Details from "../Details";


function Home() {


    return (
        
        <>
            <Navbar></Navbar>
            <Switch>
                <Route path="/countries"  component={Countries}/>
                <Route path="/activity"  component={Activity}/>
                <Route path="/country/:id" component={Details} />
            </Switch>
        </>
    )

}

export default Home;