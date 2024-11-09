import React from 'react';

function Country({ country }) {
  return (
    <div className="country">
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      <h2>{country.name.common}</h2>
      <p><strong>Official name:</strong> {country.name.official}</p>
      <p><strong>Capital:</strong> {country.capital}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Languages:</strong> {Object.values(country.languages).join(', ')}</p>
      <p><strong>Currency:</strong> {Object.values(country.currencies)[0]?.name} ({Object.values(country.currencies)[0]?.symbol})</p>
      <p><strong>Area (mi²):</strong> {country.area.toLocaleString()}</p>
      <p><strong>Subregion:</strong> {country.subregion}</p>
      <p><strong>Continents:</strong> {country.continents.join(', ')}</p>
      {country.borders && <p><strong>Borders:</strong> {country.borders.join(', ')}</p>}
      <a href={`https://www.google.com/maps/search/?api=1&query=${country.name.common}`} target="_blank" rel="noopener noreferrer">
        Show on Google Maps
      </a>
    </div>
  );
}

export default Country;
