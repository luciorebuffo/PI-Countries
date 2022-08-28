const initialState = {

  countries: [],//Los paises traidos del back static.
  filteredCountries: [],//Los paises que muestro filtrados/ordenados.
  searchedCountries: [],//Paises/pais traido por nombre.
  page: 1,
  countriesPerPage: 9,
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

    case "GET_COUNTRY_BY_NAME":
      //console.log(state.countries);
      return {
        ...state,
        filteredCountries: action.payload,
        searchedCountries: action.payload,
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
    case "RESET_STATE":
      console.log("estamo aca");
      return {
        ...state,
        filteredCountries: [],
        searchedCountries: [],
      }

    case "ORDER_BY":
      let sortered = [];

      if (action.payload === "asc") {
        sortered = state.filteredCountries.sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        );
        state.countries = state.countries.sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        );
      } else if (action.payload === "desc") {
        sortered = state.filteredCountries.sort((a, b) =>
          a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
        );
        state.countries = state.countries.sort((a, b) =>
          a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
        );
      } else if (action.payload === "minPop") {
        sortered = state.filteredCountries.sort((a, b) =>
          a.population > b.population ? 1 : -1
        );
        state.countries = state.countries.sort((a, b) =>
          a.population > b.population ? 1 : -1
        );
      } else if (action.payload === "maxPop") {
        sortered = state.filteredCountries.sort((a, b) =>
          a.population < b.population ? 1 : -1
        );
        state.countries = state.countries.sort((a, b) =>
          a.population < b.population ? 1 : -1
        );
      } else if (action.payload === "") {
        sortered = state.filteredCountries;
      }

      return {
        ...state,
        filteredCountries: sortered,
      };

    case "FILTER_BY_CONTINENT":

      let filtered = [];
      let stateToFilter = [];

      if (state.searchedCountries.length == 0) {
        stateToFilter = state.countries;
      }
      else {
        stateToFilter = state.searchedCountries;
      }

      switch (action.payload) {
        case "America":
          filtered = stateToFilter.filter((country) =>
            country.continents.includes("Americas")
          )
          break;
        case "Africa":
          filtered = stateToFilter.filter((country) =>

            country.continents.includes("Africa")
          )
          break;
        case "Asia":
          filtered = stateToFilter.filter((country) =>
            country.continents.includes("Asia")
          )
          break;
        case "Europe":
          filtered = stateToFilter.filter((country) =>
            country.continents.includes("Europe")
          )
          break;
        case "Oceania":
          filtered = stateToFilter.filter((country) =>
            country.continents.includes("Oceania")
          )
          break;
        case "Antarctic":
          filtered = stateToFilter.filter((country) =>
            country.continents.includes("Antarctic")
          )
          break;
        default:

          filtered = stateToFilter;
          break;
      }
      //console.log(filtered)
      return {
        ...state,
        filteredCountries: filtered,
      }
    case "FILTER_BY_ACTIVITY":

      let filtByActy = [];
      let stateToFilterByAct = [];

      if (state.searchedCountries.length == 0) {
        stateToFilterByAct = state.countries;
      }
      else {
        stateToFilterByAct = state.searchedCountries;
      }

      stateToFilterByAct.forEach(country => {

        country.activities.forEach(activity => {

          if (activity.name == action.payload) {
            filtByActy.push(country);
          }

        });

      });
      return {
        ...state,
        filteredCountries: filtByActy,
      }
    case "SET_PAGE":    
      return {
        ...state,
        page: action.payload,
      }
    case "SET_COUNTRIES_PER_PAGE":    
      return {
        ...state,
        countriesPerPage: action.payload,
      }

    default:
      return state;
  }


}

export default reducer;