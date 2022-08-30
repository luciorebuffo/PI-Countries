import axios from "axios";

const API_URL = "http://localhost:3001/";

/*COUNTRY*/
//Pedimos todos los paises al back
 export const getCountries = () => {

  return async (dispatch) => {

    const response = await axios.get(API_URL + "countries");

    dispatch({
      type: "GET_COUNTRIES",
      payload: response.data,
    })

  }
}

/*export const getCountries = () => {

  return (dispatch) => {

    axios.get(API_URL + "countries")
    .then((response) => 
      dispatch({
        type: "GET_COUNTRIES",
        payload: response.data,
      }) 
    )

  }
}*/

/*export function getCountries(){

  return function (dispatch){

    return fetch(API_URL + "countries")
    .then((response) => response.json())
    .then((json) => {
      dispatch({
        type: "GET_COUNTRIES",
        payload: json,
      })

    })
    
  }
}*/


//Paises por Nombre
export const getCountryByName = (data) => {

  return async (dispatch) => {

    const response = await axios.get(API_URL + "countries?name=" + data);

    dispatch({
      type: "GET_COUNTRY_BY_NAME",
      payload: response.data,
    });


  };

};


//Paises por id = PK
export const getCountryByPk = (id) => {

  return async (dispatch) => {

    const response = await axios.get(API_URL + "countries/" + id);

    dispatch({
      type: "GET_COUNTRY_BY_PK",
      payload: response.data,
    })

  }

}
//Un clean para evitar errores visuales al traer otro por id
export const cleanCountryByPk = () => {

  return async (dispatch) => {

    dispatch({
      type: "CLEAN_COUNTRY_BY_PK",
    })

  }

}

/*ACTIVITY*/
// guarda un nuevo registro en la tabla de actividades
export const createActivity = (payload) => {
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

    const response = await axios.post(API_URL + "activity", activity);

    dispatch({
      type: "CREATE_ACTIVITY",
      payload: response.data,
    })
  }
}


/*FUNCTION ORDER*/
export const orderBy = (order) => {

  return (dispatch) => {

    dispatch({
      type: "ORDER_BY",
      payload: order
    })

  }
}

/*FILTERS*/

export const filterAll = (activity,continent) => {
  return (dispatch) => {
    dispatch({
      type: "FILTER_ALL",
      payload: {activity: activity,continent: continent}
    })
  }
}


/*RESET STATE*/
export const resetState = () => {
  return (dispatch) => {
    dispatch({
      type: "RESET_STATE",

    })
  }

}

/*SET PAGE*/
export const setPage = (page) => {
  return (dispatch) => {
    dispatch({
      type: "SET_PAGE",
      payload: page
    })
  }

}

/*SET COUNTRIES PAGE*/
export const countriesPage = (countriesPerPage) => {
  return (dispatch) => {
    dispatch({
      type: "SET_COUNTRIES_PER_PAGE",
      payload: countriesPerPage

    })
  }

}