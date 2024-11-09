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

  console.log(country); // Log the entire country object to verify its structure

  const googleMapsUrl = `https://www.google.com/maps?q=${capital}`;

  return (
    <div className="country-card">
      <img src={flags[0]} alt={name.common} />
      <h2>{name.common}</h2>
      <p><strong>Official Name:</strong> {name.official}</p>
      <p><strong>Capital:</strong> {capital}</p>
      <p><strong>Population:</strong> {population}</p>
      <p><strong>Languages:</strong> {Object.values(languages).join(', ')}</p>
      <p><strong>Currency:</strong> {Object.values(currencies).map(currency => currency.name).join(', ')}</p>
      <p><strong>Area:</strong> {area} mi²</p>
      <p><strong>Subregion:</strong> {subregion}</p>
      <p><strong>Continents:</strong> {continents.join(', ')}</p>
      <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
        Show on Google Maps
      </a>
    </div>
  );
};

export default Country;
