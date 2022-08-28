import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import reducer from "../../reducer";
import style from"./activity.module.css";
import { createActivity, resetState, getCountries, orderBy } from "../../actions";
import { useHistory } from "react-router-dom";


function Activity()
{
    let history = useHistory();
    const dispatch = useDispatch();
    let allCountries = useSelector((store) => store.countries);
    const [countriesSelected, setCountriesSelected] = useState([]);

    const [message, setMessage] = useState("");
    const [values, setValues] = useState({
        name: "",
        difficulty: 5,
        duration: 8,
        season: [],
        countries: [],
    });
    
    //console.log(values.countries);

    function setDif(event){

        if(event.target.value < 6 && event.target.value > 0)
        {
            document.getElementById("rangeDifValue").innerText = event.target.value;

            setValues({
                ...values,
                difficulty: event.target.value,
            });
            
        }
    }
    function setDuration(event){
        
        if(event.target.value < 9 && event.target.value > 0)
        {
            document.getElementById("rangeDurationValue").innerText = event.target.value;

            setValues({
                ...values,
                duration: event.target.value,
            });
            
        }
    }    
    function setSeason(event)
    {
        
        let copySeason = Array.from(values.season);
        document.getElementById("seasonTitle").innerText = "Select Season";
        document.getElementById("seasonTitle").style.color = "Black";

        switch (event.target.value) {
            case "SUMMER":
                
                if(event.target.classList.contains(style.notSelected)){

                    event.target.classList.remove(style.notSelected);

                    copySeason.push("Summer");
                    setValues({
                        ...values,
                        season: copySeason,
                    });

                }
                else{
                    event.target.classList.add(style.notSelected);

                    copySeason = copySeason.filter(e => e !== "Summer");
                    setValues({
                        ...values,
                        season: copySeason,
                    });
                }
                break;
            case "SPRING":
                if(event.target.classList.contains(style.notSelected)){
                    event.target.classList.remove(style.notSelected);

                    copySeason.push("Spring");
                    setValues({
                        ...values,
                        season: copySeason,
                    });
                }
                else{
                    event.target.classList.add(style.notSelected);

                    copySeason = copySeason.filter(e => e !== "Spring");
                    setValues({
                        ...values,
                        season: copySeason,
                    });
                }
                
                break;
            case "AUTUMN":
                if(event.target.classList.contains(style.notSelected)){

                    event.target.classList.remove(style.notSelected);

                    copySeason.push("Autumn");
                    setValues({
                        ...values,
                        season: copySeason,
                    });
                }
                else{
                    event.target.classList.add(style.notSelected);

                    copySeason = copySeason.filter(e => e !== "Autumn");
                    setValues({
                        ...values,
                        season: copySeason,
                    });
                }
                
                break;
            case "WINTER":
                if(event.target.classList.contains(style.notSelected)){
                    event.target.classList.remove(style.notSelected);

                    copySeason.push("Winter");
                    setValues({
                        ...values,
                        season: copySeason,
                    });
                }
                else{
                    event.target.classList.add(style.notSelected);

                    copySeason = copySeason.filter(e => e !== "Winter");
                    setValues({
                        ...values,
                        season: copySeason,
                    });
                }
                
                break;
        
            default:
                break;
        }
    }
    function addCountry(event){

        document.getElementById("selectCountryTitle").innerText = "Select Country";
        document.getElementById("selectCountryTitle").style.color = "Black"
       
        let country = {
            id: event.target.id,
            name: event.target.value
        }
        
        let copySelected = Array.from(values.countries);
        let copySelectedList = Array.from(countriesSelected);
        
        if(/*!copySelected.filter(e => e.id == event.target.id).length > 0*/!copySelected.includes(event.target.id))
        {
            copySelected.push(event.target.id);
            copySelectedList.push(country);

            setValues({
                ...values,
                countries: copySelected,
            }); 

            setCountriesSelected(copySelectedList);  
            
        } 
    }
    function removeCountry(event){

        let copySelected = Array.from(values.countries);
        let copySelectedList = Array.from(countriesSelected);

        if(copySelected.includes(event.target.id))
        {
            copySelected = copySelected.filter(e => e !== event.target.id);
            copySelectedList = copySelectedList.filter(e => e.id !== event.target.id);

            setValues({
                ...values,
                countries: copySelected,
            });
            setCountriesSelected(copySelectedList);         
        }

    }
    function addName(event){
        
        //console.log(message);

        if(validateName(event.target.value))
        {  
            setMessage("");
            setValues({
                ...values,
                name: event.target.value,
            });
            event.target.style.borderBottom = "1px solid #4e8186";
            
        }
        else{
            event.target.style.borderBottom = "1px solid red";
            if(event.target.value.length == 0)
            {          
                setMessage("You should add a name!");
            }
            else{
                setMessage("Only letters!");
            }
        }

    }
    function validateName(name)
    {
        return /^[a-zA-Z]+$/.test(name);

    }
    function createNewActivity(event){
        event.preventDefault();
        
        if(validateInfo(values)) {

            dispatch(createActivity(values))
            .then(((data) => {
                dispatch(getCountries())
                .then(((data) => {
                    document.getElementById("myModal").style.display = "block";
                }))
            }));  

        }
    }
    function validateInfo(info){
        
        if(!validateName(info.name))
        {
            document.getElementById("txtName").style.borderBottom = "solid red 1px";
            if(info.name == 0)
            {
                
                setMessage("You should add a name!");
            }
            else{
                setMessage("Only letters!");
            }

            return false;
        }
        if(info.season.length == 0){

            document.getElementById("seasonTitle").innerText = "Select Season please!";
            document.getElementById("seasonTitle").style.color = "red";
            return false;
            
        }
        if(info.countries.length == 0)
        {
            document.getElementById("selectCountryTitle").innerText = "Select Country please!";
            document.getElementById("selectCountryTitle").style.color = "red";
            return false;
        }
        
        return true;
        
    }
    
    //aceptar del modal que navega
    function aceptModal(){
        document.getElementById("myModal").style.display = "none";
        history.push("/countries");
    }

    useEffect(() => {

        //componente montado en vacio

        //cargo el componente con data
        dispatch(getCountries())
        .then((data) => {
            //ordeno lo que tengo cargado en data
            dispatch(orderBy("asc"));
            //refresheo el html con la data cargada
            setCountriesSelected([]);    
        });

        /*if(allCountries.length == 0){
            dispatch(getCountries());
     
        }

        if(allCountries.length > 0){
            dispatch(orderBy("asc"));
            setCountriesSelected([]);
        }*/
        
        
    }, [dispatch/*, allCountries*/]);

    return (
        <div className={style.Container}>       
                <form className = {style.form} /*onSubmit={createActivity}*/>
                    <div className={style.divTitle}>
                        <p className={style.myTitle}>Create new Activity!</p>
                    </div>
                    <div className={style.fullForm}>
                        <div className={style.divData}>
                            
                            <div className={style.divName}>
                                <input className={style.txtName} id="txtName" type = "text" placeholder="Activity name" maxLength="25" onChange={addName}></input>
                                <p className={style.nameValidation}>{message}</p>
                            </div>
                            
                            <div className={style.divDificultad}>
                                <p className={style.dificultadTitle}>Difficulty: </p>
                                <input className={style.rangeDificultad} type="range" min = "1" max = "5" onChange={setDif}></input>
                                <p className={style.rangeDifValue} id="rangeDifValue">5</p>
                            </div>

                            
                            <div className={style.divDuracion}>
                                <p className={style.durationTitle}>Duration: </p>
                                <input className={style.rangeDuracion} type="range" min = "1" max = "8" onChange={setDuration}></input>
                                <p className={style.rangeDuracionValue} id="rangeDurationValue">8</p>
                            </div>
                            
                            <p className={style.seasonTitle} id="seasonTitle">Select Season</p>
                            <div className={style.btnControl}>
                                <input type= "button" className={`${style.btnSummer} ${style.notSelected}`} value="SUMMER" onClick={setSeason}></input>
                                <input type= "button" className={`${style.btnSpring} ${style.notSelected}`} value="SPRING" onClick={setSeason}></input>
                                <input type= "button" className={`${style.btnAutumn} ${style.notSelected}`} value="AUTUMN" onClick={setSeason}></input>
                                <input type= "button" className={`${style.btnWinter} ${style.notSelected}`} value="WINTER" onClick={setSeason}></input>
                            </div>

                            <p className={style.selectCountryTitle} id="selectCountryTitle">Select Country</p>
                            <div className={style.selectControl}>
                                <select className={style.selectCountries} id="countries" multiple>
                                    {allCountries && allCountries.map((c) => (
                                    <option
                                        key={c.id}
                                        id={c.id}
                                        value={c.name} 
                                        className={style.optionCountry} 
                                        onClick={addCountry}       
                                    >
                                        {c.name}
                                    </option>
                                    ))}
                                </select>
        
                            </div>

                        </div>
                        <div className={style.divList}>
                            <div className={style.listTitle}>
                                <p className={style.myListTitle}>Selected Countries</p>
                            </div>
                            <div className={style.fullList}>
                                <select className={style.selectSelectedCountry} id="countries" multiple  >
                                {countriesSelected && countriesSelected.map((c) => (
                                    <option
                                        key={c.id}
                                        id={c.id}
                                        value={c.name} 
                                        className={style.selectedCountries} 
                                        onClick={removeCountry}      
                                    >
                                        {c.name}
                                    </option>
                                ))}
                                </select>
                            </div>
                            <div className={style.divMessage}>
                            <p className={style.myMessage}>Click country to delete!</p>
                            </div>                       

                        </div>
                    </div>
                    <div className={style.btnCreateContainer}>
                        <button className={style.btnCreate} /*type="submit"*/ onClick={createNewActivity}>
                        CREATE
                        </button>
                    </div>
                </form>

                <div id="myModal" className={style.divModal}>

                    <div className={style.modalContent}>
                        <p>Activity Created!!!</p>
                        <input className ={style.btnModal}type="button" value="ACEPTAR" onClick={aceptModal}></input>
                    </div>

                </div>
                
        </div>
    )
}

export default Activity;