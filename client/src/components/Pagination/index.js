import React from "react";
import style from "./pagination.module.css";

function Pagination({currentPage, allCountries, paginado, prev, next}){

    const pageNumbers = [];
    //Voy a recorrer un arreglo en el que voy a dividir todos los paises
    // por paginado así creo varias paginas.
    // quiero que me traiga en la ultima pagina lo que sobre
    //le saco los 10 de la primer pagina solo la primera vez
    
    if(pageNumbers.length == 0 && allCountries > 9)
    {
        allCountries = allCountries -9;
        pageNumbers.push(1);


        for(let i = 1; i <= Math.ceil( allCountries / 10); i++){
            //Pusheo en el arreglo la cantidad total de paginas que va a tener la app
            pageNumbers.push(i+1);
            
        }
    }
    else{
        pageNumbers.push(1);
    }
    
    

    return (
        
            <div className={style.Container}>
                <button className = {style.btnPrev} onClick={() => prev()}>PREV</button>       
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
                <button className = {style.btnNext}  onClick={() => next(pageNumbers.length)}>NEXT</button>
            </div>
        
    )

}

export default Pagination;