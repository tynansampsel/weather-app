import { useState, useEffect } from "react";
import HourlyWeatherCard from './HourlyWeatherCard';
import { Link } from 'react-router-dom';

function App() {

  const [hour, setHour] = useState([]);
  const [temperature, setTemperature] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [windSpeed, setWindSpeed] = useState([]);
  const [currentHour, setCurrentHour] = useState("");
  const [currentHourIndex, setCurrentHourIndex] = useState(0);

  useEffect(() => {
    GetWeather();
  }, [])

  const GetWeather = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,windspeed_10m&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`)
        .then(res => res.json())
        .then(data => {
          const date = new Date();

          //setCurrentHour(data.current.time.slice(11, 13) + ":00")
          setCurrentHour(date.getHours() + ":00")
          setHour(data.hourly.time.slice(0, 25))
          setTemperature(data.hourly.temperature_2m.slice(0, 25))
          setWindSpeed(data.hourly.windspeed_10m.slice(0, 25))
          setHumidity(data.hourly.relativehumidity_2m.slice(0, 25))
        })
        .catch(err => console.error("error: ", err))
    });
  }

  return (
    <div className="App">
      <form>
      </form>
      <h1 className="cityName">Halifax</h1>
      <div className="lineTop"></div>
      <div className="carouselWrapper">
        <div className="carousel"  >
          {
            hour.map((timeVal, i) => {
              return <HourlyWeatherCard key={i}
                isCurrentHour={hour[i].slice(11) == currentHour}
                hour={hour[i].slice(11)}
                temperature={temperature[i]}
                windSpeed={windSpeed[i]}
                humidity={humidity[i]} />
            })
          }
        </div>
      </div>
      <div className="lineBottom"></div>
      <p className="creditCreator">Made by <Link to="https://tynan-sampsel.onrender.com/" target="_blank" rel="noopener noreferrer">Tynan Sampsel</Link></p>
      <p className="creditWeatherAPI">Special thanks to <Link to="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">open-meteo.com</Link></p>
    </div>
  );
}

export default App;


