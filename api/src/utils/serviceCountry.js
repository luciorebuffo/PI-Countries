const axios = require('axios');
const { Op } = require('sequelize');
const { Activity, Country } = require("../db");



//Guarda los paises de la api en mi bd
const setCountries = async () => {
    try {
        
        const restCountries = await axios.get("https://restcountries.com/v3/all");
      
        const countries = restCountries.data.map((country) => {
            return {
            id: country.cca3,
            name: country.name.common,
            flags: country.flags[1],
            continents: country.region,
            subregion: country.subregion || "No tiene",
            capital: country.capital ? country.capital[0] : "",
            population: Number(country.population),
            area: Number(country.area),
            };
        });
        
        Country.bulkCreate(countries); 

    } catch (error) {
      console.log(error);
    }
};

//no async
/*const setCountries = () => {
    try {
        
        return axios.get("https://restcountries.com/v3/all")
        .then((resp) =>{

            const countries = resp.data.map((country) => {
                return {
                id: country.cca3,
                name: country.name.common,
                flags: country.flags[1],
                continents: country.region,
                subregion: country.subregion || "No tiene",
                capital: country.capital ? country.capital[0] : "",
                population: Number(country.population),
                area: Number(country.area),
                };
            });
            
            Country.bulkCreate(countries);

        })

    } catch (error) {
      console.log(error);
    }
};*/


//Retorno todo de la tabla country
const getCountries = async () =>{
    try {
        const countries = await Country.findAll(
            {include: [
                {
                model: Activity,
                    through: {
                        attributes: [],
                    }
                }
            ]}
        );
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
                        [Op.iLike]: `${name}%`
                    }    
                },
                include: [
                    {
                    model: Activity,
                        through: {
                            attributes: [],
                        }
                    }
                ]
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

const getCountryByPk = async (id) => {

    try {

        const detail = await Country.findOne({
            where: {
                id: id,
            },
            include: [
                {
                model: Activity,
                    through: {
                        attributes: [],
                    }
                }
            ]
        })

        
        if(!detail){
            throw new Error("Country not found");
        }

        return detail;
        
    } catch (error) {
        throw error;
    }

    
}






module.exports = {
    getCountryByName,
    getCountryByPk,
    
}
