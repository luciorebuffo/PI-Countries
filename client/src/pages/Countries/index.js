import React, { useEffect, useState } from "react";
import style from"./countries.module.css";
import { useDispatch, useSelector} from "react-redux";
import {getCountries, orderBy, filterByContinent, getCountryByName,filterByActivity,resetState} from "../../actions";


import  Pagination  from "../../components/Pagination";
import Card from "../../components/Card";
import Menu from "../../components/Menu";



function Countries(){

    const dispatch = useDispatch();
    const filteredCountries = useSelector((state) => state.filteredCountries);
    const [currentPage, setCurrentPage] = useState(1); //Arranco en la primer pagina (useState(1))
    const [countriesPerPage, setCountriesPerPage] = useState(9); //Ya que 'currentPage = 1' seteo las ciudades en 9

    const [order, setOrder] = useState("");
    const [filter, setFilter] = useState("");
    const [countryName, setCountryName] = useState("");
    const [activityName, setActivityName] = useState("");
   
    

    /*
    * Buscamos el primer y ultimo indice segun la posicion del paginado,
    * y retornamos las ciudades entre esos indices para mostrar segun cada page
    */
    function currentData(){
        
       let indexOfLastCountry;

       if(currentPage == 1){
            indexOfLastCountry = currentPage * countriesPerPage; 
       }
       else{
            indexOfLastCountry = currentPage * countriesPerPage-1; 
       }

       const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
       //console.log("primero: "+indexOfFirstCountry+","+"Ultimo: "+indexOfLastCountry);
       return filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);
      
    }

    /*
    * Al hacer click en algun indice del paginado ejecutamos esta funcion,
    * segun el indice que recible setea el indice recibido y las ciudades por paginado
    */
    function paginado(pageNumber){
        
        setCurrentPage(pageNumber);

        if(pageNumber == 1)
        {
            setCountriesPerPage(9);
        }
        else{
            setCountriesPerPage(10);
        }

    }

    /*Filtrado por continente*/
    function filterContinent(event){
        //console.log(event.target.value);

        //le digo al action filtra
        dispatch(filterByContinent(event.target.value));

        //seteo el tipo de filtro, y refresheo el componente
        setFilter(event.target.value);
        setCurrentPage(1);
        setCountriesPerPage(9);
    }

    /*Ordenamiento*/
    function ordenar(event){
        //Le digo al action ordena
        dispatch(orderBy(event.target.value));

        // setea el estado y refreshea el componente
        setOrder(event.target.value);
        
    }

    /*Busqueda por nombre*/
    function handleByName(event){

        if(validateString(event.target.value)){

            setCountryName(event.target.value);

        }

    }
    function validateString(name)
    {
        return /^[a-zA-Z]+$/.test(name);

    }
    function searchByname(){

        if(countryName != "")
        {
            //console.log(countryName);
            dispatch(getCountryByName(countryName));
            setCurrentPage(1);
            setCountriesPerPage(9);
        }
    }

    /*Filtrado por actividad */
    function handleByActivity(event){

        if(validateString(event.target.value)){

            setActivityName(event.target.value);

        }

    }
    function filterActivity(){

        if(activityName != "")
        {
            //console.log(activityName);
            dispatch(filterByActivity(activityName));
            setCurrentPage(1);
            setCountriesPerPage(9);
        }
    }

    /*Reset Button*/
    function reset(){
        dispatch(resetState());
        resetOptions();
        setCountryName("");
        setActivityName("");
        setOrder("");
        setFilter("All");
        dispatch(getCountries());
        setCurrentPage(1);
        setCountriesPerPage(9);
    }
    function resetOptions(){
        document.getElementById("selectOrder").value = "";
        document.getElementById("selectContinent").value = "All";
        document.getElementById("inputName").value = "";
        document.getElementById("inputActivity").value = "";
        
    }

    
    
    
    
    useEffect(() => {

        if(filteredCountries.length == 0){
            dispatch(getCountries());
        }
        
    }, [dispatch]);
    
    return (
        <div className={style.countriesContainer}>
            <Menu 
            byName =  {handleByName}
            nameOnClick = {searchByname}
            filterContinent = {filterContinent}
            ordenar = {ordenar}
            byActivity = {handleByActivity}
            activityOnClick = {filterActivity}
            reset = {reset}
            />
            {
            //Reviso si los paises estan cargados
            currentData().length === 0 ? (
                <h2 className="error-msg">Countries not found!</h2>
            ):  
                    // Renderizo el componente card
            currentData().map((e) =>{ 
                return(
                    <Card key={e.id} 
                        id={e.id}  
                        name={e.name} 
                        img={e.flags} 
                        continents={e.continents} 
                        subregion={e.subregion} 
                        capital={e.capital} 
                        population={e.population} 
                        area={e.area}
                    />
                    );
                })
            }     
            <Pagination
                allCountries={filteredCountries.length}
                paginado= {paginado}
                currentPage={currentPage}
            />          
        </div>    
    )
}

export default Countries;