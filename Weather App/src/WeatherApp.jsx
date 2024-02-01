import React, { useState, useEffect } from "react";
import { MdOutlineWrongLocation } from "react-icons/md";
import { MdErrorOutline } from "react-icons/md";
import Error from "./Error";
import WeatherComponent from "./WeatherComponent";

function WeatherApp() {
  const [location, setLocation] = useState({});
  const [weather, setWeather] = useState(null);
  const [cityName, setCityName] = useState("");
  const [timezoneOffset, setTimezoneOffset] = useState(0);


  function fetchWeather(latitude, longitude) {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
        setTimezoneOffset(data.timezone);
        setCityName("");
      })

      .catch((error) => console.log("Error:", error));
  }

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
  
          setLocation({
            latitude: lat,
            longitude: lon,
          });
  
          fetchWeather(lat, lon);
        },
        (error) => {
          
          console.log(error); 
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setWeather({ cod: "LocationDisabled", message: "Location is disabled. Please enable location access to fetch the weather details." });
              break;
            case error.POSITION_UNAVAILABLE:
            case error.TIMEOUT:
            default:
              setWeather({ cod: "Error", message: "Error fetching location. Please try again later." });
              break;
          }
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setWeather({ cod: "NotSupported", message: "Geolocation is not supported by this browser." });
    }
  }, []);
  

  return (
    <div className="bg-weather bg-no-repeat bg-cover h-screen flex justify-center items-center ">
      <div className="w-3/5 h-4/5 bg-[#9999996b] rounded-lg">
        {weather?.cod === 200 ? (
          <WeatherComponent weather={weather} timezoneOffset={timezoneOffset} cityName={cityName} setCityName={setCityName} setWeather={setWeather} setTimezoneOffset={setTimezoneOffset}/>
        ) : weather?.cod === "404" ? (
          <Error
            Icon={MdOutlineWrongLocation}
            message="City Not Found, Please Enter Valid City Name."
          />
        ) : weather?.cod === "LocationDisabled" ? (
          <Error
            Icon={MdOutlineWrongLocation}
            message="Location is disabled. Please enable location access to fetch the weather details."
          />
        ) : weather?.cod === "NotSupported" ? 
        (
            <Error
              Icon={MdOutlineWrongLocation}
              message="Geolocation is not supported by this browser."
            />
          )
        : (
          <Error
            Icon={MdErrorOutline}
            message="Error, Please Try After Sometime."
          />
        )}
      </div>
    </div>
  );
}

export default WeatherApp;
