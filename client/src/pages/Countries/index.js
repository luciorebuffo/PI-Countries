import React, { useEffect, useState } from "react";
import "./countries.css";
import { useDispatch, useSelector} from "react-redux";
import {getCountries} from "../../actions";

import  Pagination  from "../../components/Pagination";
import Card from "../../components/Card";



function Countries(){

    const dispatch = useDispatch();
    const filteredCountries = useSelector((state) => state.filteredCountries);

    //Arranco en la primer pagina (useState(1))
    const [currentPage, setCurrentPage] = useState(1);
    //Como inicio en la page 1, seteo en 10 la cantidad de ciudades por pagina
    const [countriesPerPage, setCountriesPerPage] = useState(10);

    let indexOfLastCountry;

    if(currentPage == 1)
    {
        indexOfLastCountry = currentPage * countriesPerPage;
    } 
    else{
        indexOfLastCountry = currentPage * countriesPerPage+1;
    }

    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);
    //console.log("primero: "+indexOfFirstCountry+","+"Segundo: "+indexOfLastCountry);

    
    

    const paginado = (pageNumber) => {
        
        setCurrentPage(pageNumber);

        if(pageNumber !=1)
        {
            setCountriesPerPage(9);

        }

        if(pageNumber == 1)
        {
            setCountriesPerPage(10);
        }
        
    } 

    useEffect(() => {

        dispatch(getCountries());

    }, [dispatch]);
    
    return (
        <div className="countriesContainer">
            <div className="home-paginado">
                    <div className="home-painado-container">
                        <Pagination
                            allCountries={filteredCountries.length}
                            paginado= {paginado}
                            currentPage={currentPage}
                        />
                    </div>
            </div>

            <div className="home-cards">
                {
                    currentCountries.length === 0 ? (
                        <h2 className="error-msg">Countries not found!</h2>
                    ):
                    //Renderizo el componente card
                    //Primero pregunto si existe
                    currentCountries?.map((e) =>{
                        
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
        </div>



        
    )
}

export default Countries;