const { Router } = require('express');
const axios = require('axios');
const { Country, Activity } = require("../db");
const {
    createActivity,
    deleteActivity
    
} = require("../utils/serviceActivity");

const router = Router();

router.post("/activity", async function (req, res){

    const {activity, countries} = req.body;
    try{      
        res.status(200).json(await createActivity(activity, countries));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
});

router.delete("/activities", async function (req, res){

    const {name} = req.query;

    try {
        res.status(200).json(await deleteActivity(name));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})



module.exports = router;