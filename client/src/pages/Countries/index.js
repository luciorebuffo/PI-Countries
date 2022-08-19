import React, { useEffect, useState } from "react";
import style from"./countries.module.css";
import { useDispatch, useSelector} from "react-redux";
import {getCountries} from "../../actions";

import  Pagination  from "../../components/Pagination";
import Card from "../../components/Card";



function Countries(){

    const dispatch = useDispatch();
    const filteredCountries = useSelector((state) => state.filteredCountries);
    const [currentPage, setCurrentPage] = useState(1); //Arranco en la primer pagina (useState(1))
    const [countriesPerPage, setCountriesPerPage] = useState(10); //Ya que 'currentPage = 1' seteo las ciudades en 10


    /*
    * Buscamos el primer y ultimo indice segun la posicion del paginado,
    * y retornamos las ciudades entre esos indices para mostrar segun cada page
    */
    function currentData(){
        
       let indexOfLastCountry;

       if(currentPage == 1){
            indexOfLastCountry = currentPage * countriesPerPage; //10 = 1 * 10;
       }
       else{
            indexOfLastCountry = currentPage * countriesPerPage + 1; //X = Page * N + 1, si N = 9 && Page = 2, => 19 = 2 * 9 + 1
       }

       const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
       //console.log("primero: "+indexOfFirstCountry+","+"Segundo: "+indexOfLastCountry);
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
            setCountriesPerPage(10);
        }
        else{
            setCountriesPerPage(9);
        }

    }

    useEffect(() => {

        dispatch(getCountries());

    }, [dispatch]);
    
    return (
        <div className={style.countriesContainer}>
            <Pagination
                allCountries={filteredCountries.length}
                paginado= {paginado}
                currentPage={currentPage}
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
        </div>    
    )
}

export default Countries;