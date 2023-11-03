import { useState, useEffect } from "react";
import React, { useRef } from 'react';


function HourlyWeatherCard(props) {
    const ref = useRef();

    useEffect(() => {
        if (!ref.current) return;
        if (!props.isCurrentHour) return;
        ref.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    });

    const getTime = (time) => {
        let timeNumber = Number(time.slice(0,2))
        let suffix = "am";
        
        if(timeNumber === 24 || timeNumber === 0){
            timeNumber = 12;
            suffix = "am";
        }
        else if(timeNumber === 12){
            suffix = "pm";
        }
        else if(timeNumber > 11){
            timeNumber = timeNumber - 12;
            suffix = "pm";
        }
        return timeNumber + suffix;
    }

    return (
        <div className={`hourlyWeatherCard ${props.isCurrentHour ? " currentHourCard" : ""} `}
            ref={ref}>
            <h2 className="temperature">{Math.round(props.temperature)}°</h2>
            <h3 className="humidity">&#127778;{props.humidity}%</h3>
            <h3 className="windSpeed">&#127787;{props.windSpeed}km/h</h3>
            <h3 className="hour">{getTime(props.hour)}</h3>
        </div>
    );
}

export default HourlyWeatherCard;


