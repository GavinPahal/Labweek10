import React from 'react';

const Country = ({ country }) => {
  return (
    <div>
      <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width="50" />
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital ? country.capital[0] : 'N/A'}</p>
      <p>Population: {country.population.toLocaleString()}</p>
      <p>Area: {country.area.toLocaleString()} km²</p>
      <p>Continent: {country.continents[0]}</p>
      <p>Subregion: {country.subregion}</p>
    </div>
  );
};

export default Country;
