import React from 'react';
import './WeatherResult.css';
import {Skycons} from "../../skycons";

const WeatherResult = (props) => {
    const {description, inputValue, temp, iconName, show} = props.values;
    let structure;
    // debugger
    if(show === ''){
        structure = null
    }
    else if(show === false && inputValue.length > 0){
        structure = (
        <div className="weather-result">
            <div className="weather-result__card">
                <p className="card__title">We don't have {inputValue} in database</p>
            </div>
        </div>
        )
    }else if(show && inputValue.length > 0){
        let skycons = new Skycons({"color": "white"});
        skycons.set("icon1", Skycons[iconName]);
        structure = (
        <div className="weather-result">
            <div className="weather-result__card">
                <h1 className="card__title">{inputValue}</h1>
                <canvas id="icon1" width="128" height="128"></canvas>
                <h1 className="card__temp">{temp} &#176;C</h1>
                <p className="card__desc" >{description}</p>
            </div>
        </div>
        )
    }
    return (
        <>
            {structure}
        </>
     );
}
 
export default WeatherResult;