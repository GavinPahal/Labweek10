import React from 'react';

const Country = ({ country }) => {
  const {
    flags,
    name,
    capital,
    population,
    languages,
    currencies,
    area,
    subregion,
    continents,
  } = country;

  // Extract currency names
  const currencyNames = currencies ? Object.values(currencies).map(currency => currency.name).join(', ') : 'N/A';

  // Extract languages
  const languageNames = languages ? Object.values(languages).join(', ') : 'N/A';

  // Google Maps link
  const googleMapsUrl = `https://www.google.com/maps?q=${capital}`;

  return (
    <div className="country-card">
      <img src={flags[0]} alt={name.common} width="100" />
      <h2>{name.common}</h2>
      <p><strong>Official Name:</strong> {name.official}</p>
      <p><strong>Capital:</strong> {capital}</p>
      <p><strong>Population:</strong> {population.toLocaleString()}</p>
      <p><strong>Languages:</strong> {languageNames}</p>
      <p><strong>Currency:</strong> {currencyNames}</p>
      <p><strong>Area (mi²):</strong> {area ? area.toLocaleString() : 'N/A'}</p>
      <p><strong>Subregion:</strong> {subregion || 'N/A'}</p>
      <p><strong>Continents:</strong> {continents.join(', ')}</p>
      <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
        Show on Google Maps
      </a>
    </div>
  );
};

export default Country;
