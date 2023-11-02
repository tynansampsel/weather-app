import { useState, useEffect } from "react";
const WEATHER_API = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,windspeed_10m&hourly=temperature_2m,relativehumidity_2m,windspeed_10m"

const CITY_API = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCkUOdZ5y7hMm0yrcCQoCvLwzdM6M8s5qk&libraries=places&callback=initAutocomplete"


function App() {

	const [temperature, setTemperature] = useState(0);
	const [humidity, setHumidity] = useState(0);
	const [windSpeed, setWindSpeed] = useState(0);


  useEffect(() => {
    GetWeather();
    //GetCity();

    //console.log(todos);
  }, [])

  

  

  const GetWeather = () => {

    navigator.geolocation.getCurrentPosition(function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,windspeed_10m&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setTemperature(data.current.temperature_2m)
        setWindSpeed(data.current.windspeed_10m)
      })
      .catch(err => console.error("error: ", err))
    });


  }
/*
  const GetCity = () => {
    fetch(CITY_API)
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => console.error("error: ", err))
  }
*/
  return (
    <div className="App">
      <form>
      </form>

      <h1 className="city">Halifax</h1>

      <div className="infoBox">
        <h2 className="temperature">{Math.round(temperature)}°</h2>
        <h3 className="humidity">{0}%</h3>
        <h3 className="wind_speed">{windSpeed}km/h</h3>
      </div>

    </div>
  );
}

export default App;


