import React, { useState } from 'react';

function CitySelector({ onCityChange }) {
   const [selectedCity, setSelectedCity] = useState('');

   return (
      <div>
         <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
            <option value="">Выберите город</option>
            <option value="Москва">Москва</option>
            <option value="Санкт-Петербург">Санкт-Петербург</option>
            <option value="Сочи">Сочи</option>
            <option value="Териберка">Териберка</option>
            <option value="Казань">Казань</option>
         </select>
         <button onClick={() => onCityChange(selectedCity)}>Показать погоду</button>
      </div>
   );
}

export default CitySelector;