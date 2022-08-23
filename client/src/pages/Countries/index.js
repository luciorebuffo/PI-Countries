import React, { useEffect, useState } from "react";
import style from"./countries.module.css";
import { useDispatch, useSelector} from "react-redux";
import {getCountries, orderBy, filterCountries} from "../../actions";


import  Pagination  from "../../components/Pagination";
import Card from "../../components/Card";
import Menu from "../../components/Menu";



function Countries(){

    const dispatch = useDispatch();
    const filteredCountries = useSelector((state) => state.filteredCountries);
    const [currentPage, setCurrentPage] = useState(1); //Arranco en la primer pagina (useState(1))
    const [countriesPerPage, setCountriesPerPage] = useState(9); //Ya que 'currentPage = 1' seteo las ciudades en 9

    const [order, setOrder] = useState("");
    //console.log(order);

    const [filter, setFilter] = useState("");
    
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

    /*Vamo a Filtrar*/
    function filterContinent(event){
        //console.log(event.target.value);

        //le digo al action filtra
        dispatch(filterCountries(event.target.value));

        //seteo el tipo de filtro, y refresheo el componente
        setFilter(event.target.value);
    }

    /*Vamo a Ordenar*/
    function ordenar(event){
        //console.log(event.target.value);


        //Le digo al action ordena
        dispatch(orderBy(event.target.value));

        // setea el estado y refreshea el componente
        setOrder(event.target.value);
    }

    useEffect(() => {

        dispatch(getCountries());

    }, [dispatch]);
    
    return (
        <div className={style.countriesContainer}>
            <Menu 
            filterContinent = {filterContinent}
            ordenar = {ordenar}
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