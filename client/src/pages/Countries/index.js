import React, { useEffect, useState } from "react";
import style from"./countries.module.css";
import { useDispatch, useSelector} from "react-redux";
import {
    getCountries, 
    orderBy,  
    getCountryByName,
    resetState,
    setPage,
    countriesPage,
    filterAll,
} from "../../actions";


import  Pagination  from "../../components/Pagination";
import Card from "../../components/Card";
import Menu from "../../components/Menu";



function Countries(){

    const dispatch = useDispatch();
    const filteredCountries = useSelector((state) => state.filteredCountries);
    const page = useSelector((state) => state.page);
    const countriesPag = useSelector((state) => state.countriesPerPage);
    const [currentPage, setCurrentPage] = useState(page); 
    const [countriesPerPage, setCountriesPerPage] = useState(countriesPag); 

    const [order, setOrder] = useState("");
    const [filter, setFilter] = useState("All");
    const [countryName, setCountryName] = useState("");
    const [activityName, setActivityName] = useState("");
   
    console.log(activityName);
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
        dispatch(setPage(pageNumber));

        if(pageNumber == 1)
        {
            setCountriesPerPage(9);
            dispatch(countriesPage(9));

        }
        else{
            setCountriesPerPage(10);
            dispatch(countriesPage(10));
        }

    }
    //prev
    function prev()
    {
        if(currentPage > 1)
        {
            let newPage = currentPage - 1;
            setCurrentPage(newPage);

            if(newPage == 1)
            {
                setCountriesPerPage(9);
                dispatch(countriesPage(9));
            }
        }
    }
    //next
    function next(pageNumber)
    { 
        if(currentPage < pageNumber)
        {
            let newPage = currentPage + 1;
            setCurrentPage(newPage);

            if(newPage != 1)
            {
                setCountriesPerPage(10);
                dispatch(countriesPage(10));
            }
        }
    }




    /*Filtrado por continente*/
    function filterContinent(event){
        //console.log(event.target.value);

        //le digo al action filtra
        //dispatch(filterByContinent(event.target.value));
        setFilter(event.target.value);
        dispatch(filterAll(activityName,event.target.value));
        

        //acomodo las page para evitar errores
        dispatch(setPage(1));
        dispatch(countriesPage(9));
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

        if(event.target.value.length == 0)
        {
            setActivityName("");
        }
    }
    function filterActivity(){

        if(activityName != "")
        {
            //console.log(activityName);
            //dispatch(filterByActivity(activityName));
            dispatch(filterAll(activityName,filter));
            
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
        dispatch(setPage(1));
        dispatch(countriesPage(9));
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
                <h2 className={style.errorMsg}>Countries not found!</h2>
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
                prev = {prev}
                next = {next}
            />          
        </div>    
    )
}

export default Countries;