
import React, { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";




function WeatherComponent({weather , timezoneOffset , cityName , setCityName , setWeather , setTimezoneOffset}) {
    const [currentTime, setCurrentTime] = useState(new Date());

    function fetchWeatherByCity(city) {
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    if(city){
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            setWeather(data);
            setTimezoneOffset(data.timezone);
            setCityName("");
          })
    
          .catch((error) => console.log("Error:", error));
    }
        
      }

    useEffect(() => {
        const timer = setInterval(() => {
          const now = new Date();
    
          const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
    
          const localTime = new Date(utcTime + timezoneOffset * 1000);
    
          setCurrentTime(localTime);
        }, 1000);
    
        return () => clearInterval(timer);
      }, [timezoneOffset]);
    
      const formattedTime = currentTime.toLocaleTimeString();
      const formattedDate = currentTime.toLocaleDateString();

      const handleCityChange = (e) => {
        setCityName(e.target.value);
      };
    
      const searchWeather = () => {
        fetchWeatherByCity(cityName);
      };

  return (
    <div className="w-full h-full flex">
            <div className="w-3/5 bg-location bg-cover bg-no-repeat h-full rounded-l-lg flex flex-col justify-between">
              <div className="flex justify-end">
                <p className="text-2xl font-bold p-2">
                  {weather.name} | {weather?.sys?.country}
                </p>
              </div>
              <div>
              <img
                  className="bg-[#ff68684f] rounded-full w-1/5 mx-auto"
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt=""
                />
              </div>
              <div className="p-4 flex justify-between">
                <div>
                  <div>
                    <p className="text-2xl text-white font-bold">
                      {formattedTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl text-white font-bold">
                      {formattedDate}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-3xl text-white font-bold">
                    {weather?.main?.temp}°C
                  </p>
                </div>
              </div>
            </div>
            <div className="w-2/5 ">
              <div className="h-1/5 flex items-center border-b border-gray-200 mx-4">
                <img
                  className="bg-[#ffffff4f] rounded-full w-1/5 mx-auto"
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt=""
                />
              </div>

              <div className="h-1/6 flex justify-center items-center">
                <div className="flex border border-white px-2 py-1 rounded">
                  <input
                    type="text"
                    className="outline-none bg-transparent text-white placeholder-white"
                    value={cityName}
                    onChange={handleCityChange}
                    placeholder="Enter City Name"
                  />
                  <IoIosSearch
                    color="white"
                    className="text-2xl cursor-pointer"
                    onClick={searchWeather}
                  />
                </div>
              </div>
              <div>
                <div>
                  <p className="text-center text-white font-semibold">
                    {weather.name} , {weather?.sys?.country}
                  </p>
                  <p className="text-center text-white font-semibold">
                    {weather.weather[0].main}
                  </p>
                </div>
                <div className="flex justify-around text-white font-semibold border-b m-6">
                  <p>Temp</p>
                  <p>{weather.main.temp}°C</p>
                </div>
                <div className="flex justify-around text-white font-semibold border-b m-6">
                  <p>Visibility</p>
                  <p>{weather.visibility / 1000} Km</p>
                </div>
                <div className="flex justify-around text-white font-semibold border-b m-6">
                  <p>Wind Speed</p>
                  <p>{weather.wind.speed} meter/sec</p>
                </div>
              </div>
            </div>
          </div>
  )
}

export default WeatherComponent