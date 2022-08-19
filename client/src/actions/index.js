import axios from "axios";

const API_URL = "http://localhost:3001/";

//Pedimos todos los paises al back
export const getCountries = () => {

    return async (dispatch) => {

        const response = await axios.get(API_URL+"countries");
        
        dispatch({
            type: "GET_COUNTRIES",
            payload: response.data,
        })

    }
}


// guarda un nuevo registro en la tabla de actividades

export const postActivity = async (payload) => {
    return axios.post(API_URL+'activity', payload)
   .then(function (response) {})
   .catch(function (error) {});
   
 };
