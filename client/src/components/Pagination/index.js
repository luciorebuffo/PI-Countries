import React from "react";
import "./pagination.css";

function Pagination({currentPage, allCountries, paginado}){

    const pageNumbers = [];
    //Voy a recorrer un arreglo en el que voy a dividir todas las recetas
    // por paginado así creo varias paginas.
    // Redondeo para arriba porque si me no llegan a 9 los paginados, 
    // quiero que me traiga en la ultima pagina lo que sobre
    
    if(pageNumbers.length == 0)
    {
        allCountries = allCountries -10;
        pageNumbers.push(1);
    }
    

    for(let i = 1; i <= Math.ceil( allCountries / 9); i++){
        //Pusheo en el arreglo la cantidad total de paginas que va a tener la app
        pageNumbers.push(i+1);
        
    }
    return (
        
            <div className="Container">
                
                {
                    pageNumbers.map(number => (
                        currentPage === number?
                        <li className="selected" key={number}>
                            {<a onClick={() => paginado(number)}>{number}</a>}
                        </li>
                        :
                        <li key={number}>
                            {<a onClick={() => paginado(number)}>{number}</a>}
                        </li>
                    ))
                }
                
            </div>
        
    )

}

export default Pagination;