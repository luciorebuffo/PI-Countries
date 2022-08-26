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

//Paises por Nombre
export const getCountryByName = (data) => {

  return async (dispatch) => {

    const response = await axios.get(API_URL+"countries?name="+data);

    dispatch({
      type: "GET_COUNTRY_BY_NAME",
      payload: response.data,
    });


  };

};


//Paises por id = PK
export const getCountryByPk = (id) =>{

  return async (dispatch) => {

    const response = await axios.get(API_URL+"countries/"+id);
    
    dispatch({
        type: "GET_COUNTRY_BY_PK",
        payload: response.data,
    })

  }

}
//Un clean para evitar errores visuales al traer otro por id
export const cleanCountryByPk = () =>{

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

        const response = await axios.post(API_URL+"activity", activity);

        dispatch({
          type: "CREATE_ACTIVITY",
          payload: response.data,
        })
    }
}


/*FUNCTION ORDER*/
export const orderBy = (order) => {
  
  return  (dispatch) => {
    
    dispatch({
        type: "ORDER_BY",
        payload: order
    })

  }
}

/*FILTERS*/
export const filterByContinent = (continent) =>{
  return  (dispatch) => {
    dispatch({
      type: "FILTER_BY_CONTINENT",
      payload: continent
  })
  }

}

export const filterByActivity = (activity) =>{
  return  (dispatch) => {
    dispatch({
      type: "FILTER_BY_ACTIVITY",
      payload: activity
  })
  }

}


/*RESET STATE*/
 
export const resetState = () =>{
  return  (dispatch) => {
    dispatch({
      type: "RESET_STATE",
      
    })
  }

}