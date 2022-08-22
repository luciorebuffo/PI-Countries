const initialState = {

  countries: [],
  filteredCountries: [],
  searchedCountries: [],
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
    case "CREATE_ACTIVITY":
      return {
        ...state,
        activity: action.payload,
      };

    case "GET_COUNTRY_BY_PK":
      return {
        ...state,
        country: action.payload,
      }

    case "CLEAN_COUNTRY_BY_PK":
        return {
          ...state,
          country: {},
        }
    
  
    default:
      return state;
  }


}

export default reducer;