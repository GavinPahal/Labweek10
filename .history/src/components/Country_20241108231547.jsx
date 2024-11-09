import React from 'react';

function Country({ country }) {
  return (
    <div className="country">
      <img src={country.flags.png} alt={`${country.name.common} flag`} className="flag" />
      <h2>{country.name.common}</h2>
      <p>Official name: {country.name.official}</p>
      <p>Capital: {country.capital ? country.capital[0] : 'N/A'}</p>
      <p>Population: {country.population.toLocaleString()}</p>
      <p>Languages: {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
      <p>Currency: {country.currencies ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ') : 'N/A'}</p>
      <p>Area (mi²): {(country.area * 0.3861).toFixed(2)}</p>
      <p>Subregion: {country.subregion}</p>
      <p>Continents: {country.continents.join(', ')}</p>
      {country.borders && <p>Borders: {country.borders.join(', ')}</p>}
      <a href={`https://www.google.com/maps?q=${country.name.common}`} target="_blank" rel="noopener noreferrer">
        Show on Google Maps
      </a>
    </div>
  );
}

export default Country;
