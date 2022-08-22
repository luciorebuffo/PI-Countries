const axios = require('axios');
const { Op } = require('sequelize');
const { Activity } = require("../db");

//Guarda los paises de la api en mi bd


const createActivity = async (activity, countries) =>{
    try {

        const newActivity = await Activity.create(activity);

        if (!newActivity) {
          throw new Error("Activity not created");
        }

        console.log(countries);
        const newCountries = await newActivity.addCountries(countries);

        if (!newCountries) {
          throw new Error("Countries not added");
        }

        return newActivity;

      } catch (error) {

        console.log(error);
        throw error;

      }
}



module.exports = {
    createActivity,
}