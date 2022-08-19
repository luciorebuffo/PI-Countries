import React from "react";
import style from "./pagination.module.css";

function Pagination({currentPage, allCountries, paginado}){

    const pageNumbers = [];
    //Voy a recorrer un arreglo en el que voy a dividir todos los paises
    // por paginado así creo varias paginas.
    // quiero que me traiga en la ultima pagina lo que sobre
    //le saco los 10 de la primer pagina solo la primera vez
    
    if(pageNumbers.length == 0 && allCountries > 10)
    {
        allCountries = allCountries -10;
        pageNumbers.push(1);
    }
    
    for(let i = 1; i <= Math.ceil( allCountries / 9); i++){
        //Pusheo en el arreglo la cantidad total de paginas que va a tener la app
        pageNumbers.push(i+1);
        
    }

    return (
        
            <div className={style.Container}>       
                {
                    //Si tengo el paginado, devolve con un numero sus respectivas paginas y hacelas linkeables
                    pageNumbers.map(number => (
                        currentPage === number?
                        <li className={`${style.selected} ${style.li}`} key={number}>
                            {<a onClick={() => paginado(number)}>{number}</a>}
                        </li>
                        :
                        <li className={style.li} key={number}>
                            {<a onClick={() => paginado(number)}>{number}</a>}
                        </li>
                    ))
                }
                
            </div>
        
    )

}

export default Pagination;