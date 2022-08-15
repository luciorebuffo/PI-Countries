import React, { useState } from "react";

import { Route, Switch } from "react-router-dom";


function Home() {


    return (
        
        <>
            ESTAS EN HOME
            <Switch>
                <Route path="/countries"  />
            </Switch>
        </>
    )

}

export default Home;