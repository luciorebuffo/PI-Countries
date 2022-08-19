const initialState = {

  countries: [],
  filteredCountries: [],
  seachedCountries: [],
  country: {},
  activity: {},
    
};

const reducer = (state = initialState, action) => {

  switch (action.type) {
    
    case "GET_COUNTRIES":
      
      return {
        ...state,
        countries: action.payload,
        filteredCountries: action.payload,
      }
    
  
    default:
      return state;
  }


}

export default reducer;