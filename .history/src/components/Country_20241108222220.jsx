import React from 'react';

function Country({ country }) {
  return (
    <div>
      <img src={country.flags.png} alt={`${country.name.common} flag`} width="50" />
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital ? country.capital[0] : 'N/A'}</p>
      <p>Population: {country.population.toLocaleString()}</p>
      <p>Area: {country.area.toLocaleString()} km²</p>
      <p>Continent: {country.continents.join(', ')}</p>
      <p>Subregion: {country.subregion}</p>
    </div>
  );
}

export default Country;
