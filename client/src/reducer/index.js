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
      
    case "ORDER_BY":
      let sortered = [];

      if (action.payload === "asc") {
        sortered = state.filteredCountries.sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        );
      } else if (action.payload === "desc") {
        sortered = state.filteredCountries.sort((a, b) =>
          a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
        );
      } else if (action.payload === "minPop") {
        sortered = state.filteredCountries.sort((a, b) =>
          a.population > b.population ? 1 : -1
        );
      } else if (action.payload === "maxPop") {
        sortered = state.filteredCountries.sort((a, b) =>
          a.population < b.population ? 1 : -1
        );
      } else if (action.payload === "") {
        sortered = state.filteredCountries;
      }

      return {
        ...state,
        filteredCountries: sortered,
      };

    case "FILTER_BY_ CONTINENT":

      let filtered= [];
     
      
      switch (action.payload) {
        case "America":
          filtered = state.countries.filter((country) =>
            country.continents.includes("Americas")
          )
          break;
        case "Africa":
          filtered = state.countries.filter((country) =>
            
            country.continents.includes("Africa")
          )
          break;
        case "Asia":
          filtered = state.countries.filter((country) =>
            country.continents.includes("Asia")
          ) 
          break;
        case "Europe":
          filtered = state.countries.filter((country) =>
            country.continents.includes("Europe")
          )
          break;
        case "Oceania":
          filtered = state.countries.filter((country) =>
            country.continents.includes("Oceania")
          )

          break;
        default:
          
          filtered = state.countries;
          break;
      }
      //console.log(filtered)
      return {
        ...state,
        filteredCountries: filtered,
      }
       
    
  
    default:
      return state;
  }


}

export default reducer;