const axios = require('axios');
const { Op } = require('sequelize');
const { Country } = require("../db");

//Guarda los paises de la api en mi bd
const setCountries = async () => {
    try {
      const restCountries = await axios.get("https://restcountries.com/v2/all");
  
      const countries = restCountries.data.map((country) => {
        return {
          id: country.alpha3Code,
          name: country.name,
          flags: country.flags.svg,
          continents: country.region,
          subregion: country.subregion,
          capital: country.capital || "No tiene capital",
          population: country.population,
          area: country.area,
        };
      });
  
      await Country.bulkCreate(countries);

    } catch (error) {
      console.log(error);
    }
};

//Retorno todo de la tabla country
const getCountries = async () =>{
    try {
        const countries = await Country.findAll();
        return countries;
    } catch (error) {
        console.log(error);
    }
}

//Si la tabla country esta vacia la carga de la api.
//En caso de recibir un nombre lo busca en la bd y lo retorna, si no retorna todos los paises.
const getCountryByName = async (name) => {

    
    let countries = await getCountries();
    
    if(countries.length == 0)
    {
        await setCountries();
        countries = await getCountries();
        
    }
   

    if(name)
    {
        try {
            const filtered = Country.findAll({
                where:{
                    name:{
                        [Op.or]:{
                            [Op.iLike]: `%${name}%`,
                            [Op.startsWith]: `%${name}%`,
                        }
                    }
                }
            })

            if (!filtered) {
                throw new Error("Country not found");
            }

            return filtered;
        
        } catch (error) {
            throw error;
        }
    }
    else{
        return countries;
    }

    
}




module.exports = {
    getCountryByName,
}
