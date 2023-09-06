import React, { useState } from 'react';
import './App.css';
import CitySelector from './CitySelector';
import WeatherDisplay from './WeatherDisplay';

function App() {
    const [selectedCity, setSelectedCity] = useState(null);

    const handleCityChange = (city) => {
        setSelectedCity(city);
        console.log("Selected city:", city);
    }

    return (
        <div className="App">
            <header className="App-header">
                <CitySelector onCityChange={handleCityChange} />
            </header>
            {selectedCity && <WeatherDisplay city={selectedCity} />}
        </div>
    );
}

export default App;
