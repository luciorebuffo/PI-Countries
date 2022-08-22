import axios from "axios";

const API_URL = "http://localhost:3001/";

/*COUNTRY*/
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

export const getCountryByPk = (id) =>{

  return async (dispatch) => {

    const response = await axios.get(API_URL+"countries/"+id);
    
    dispatch({
        type: "GET_COUNTRY_BY_PK",
        payload: response.data,
    })

  }

}

export const cleanCountryByPk = () =>{

  return async (dispatch) => {
    
    dispatch({
        type: "CLEAN_COUNTRY_BY_PK",
    })

  }

}



/*ACTIVITY*/
// guarda un nuevo registro en la tabla de actividades
export const createActivity = (payload) => 
{
    //console.log("action", payload);

    let activity = {
      activity: {
        name: payload.name,
        difficulty: payload.difficulty,
        duration: payload.duration,
        season: payload.season,
      },
      countries: payload.countries,
    }

    return async (dispatch) => {

        const response = await axios.post(API_URL+"activity", activity);

        dispatch({
          type: "CREATE_ACTIVITY",
          payload: response.data,
        })
    }
}
