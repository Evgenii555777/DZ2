import React, { useEffect, useState } from 'react';
import axios from 'axios';

function WeatherDisplay({ city }) {
   const [weatherData, setWeatherData] = useState(null);
   const API_KEY = 'd271a0169b17f567e62a0066b9aff61f';

   useEffect(() => {
      if (city) {
         axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=ru`)
            .then(response => {
               console.log(response.data);
               setWeatherData(response.data);
            })
            .catch(error => {
               console.error("Ошибка получения данных погоды:", error);
            });
      }
   }, [city]);

   if (!weatherData) return <p>Выберите город</p>;

   const groupedByDate = weatherData.list.reduce((acc, item) => {
      const date = new Date(item.dt_txt).toDateString();
      if (!acc[date]) {
         acc[date] = [];
      }
      acc[date].push(item);
      return acc;
   }, {});

   const nextFiveDays = Object.values(groupedByDate).slice(1, 6).map(dayReports => {
      const maxTemp = Math.max(...dayReports.map(report => report.main.temp_max));
      const minTemp = Math.min(...dayReports.map(report => report.main.temp_min));
      return {
         date: new Date(dayReports[0].dt_txt),
         description: dayReports[0].weather[0].description,
         maxTemp,
         minTemp
      };
   });

   const todayMaxTemp = Math.max(...groupedByDate[new Date(weatherData.list[0].dt_txt).toDateString()].map(report => report.main.temp_max));
   const todayMinTemp = Math.min(...groupedByDate[new Date(weatherData.list[0].dt_txt).toDateString()].map(report => report.main.temp_min));

   return (
      <div>
         <h2>{weatherData.city.name}</h2>
         <h3>Сегодня:</h3>
         <p>{weatherData.list[0].weather[0].description}</p>
         <p>Температура днем: {todayMaxTemp}°C</p>
         <p>Температура ночью: {todayMinTemp}°C</p>
         <h3>Ближайшие пять дней:</h3>
         {nextFiveDays.map((day, index) => (
            <div key={index}>
               <h4>{day.date.toLocaleDateString()}</h4>
               <p>{day.description}</p>
               <p>Температура днем: {day.maxTemp}°C</p>
               <p>Температура ночью: {day.minTemp}°C</p>
            </div>
         ))}
      </div>
   );
}

export default WeatherDisplay;