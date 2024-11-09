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
    borders,
  } = country;

  // Extract currency names
  const currencyNames = currencies ? Object.values(currencies).map(currency => currency.name).join(', ') : 'N/A';

  // Extract language names
  const languageNames = languages ? Object.values(languages).join(', ') : 'N/A';

  // Google Maps link
  const googleMapsUrl = `https://www.google.com/maps?q=${capital}`;

  return (
    <div className="country-card">
      <div className="country-header">
        <img src={flags[0]} alt={`${name.common} flag`} width="80" />
        <h2>{name.common}</h2>
      </div>
      <p><strong>Official Name:</strong> {name.official}</p>
      <p><strong>Capital:</strong> {capital}</p>
      <p><strong>Population:</strong> {population.toLocaleString()}</p>
      <p><strong>Languages:</strong> {languageNames}</p>
      <p><strong>Currency:</strong> {currencyNames}</p>
      <p><strong>Area (mi²):</strong> {area ? area.toLocaleString() : 'N/A'}</p>
      <p><strong>Subregion:</strong> {subregion || 'N/A'}</p>
      <p><strong>Continents:</strong> {continents.join(', ')}</p>

      {/* Display Bordering Countries */}
      <div className="border-countries">
        <strong>Borders:</strong>
        {borders && borders.length > 0 ? (
          borders.map((border, index) => (
            <div key={index} className="border-card">
              <p>{border}</p>
            </div>
          ))
        ) : (
          <p>None</p>
        )}
      </div>

      <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
        Show on Google Maps
      </a>
    </div>
  );
};

export default Country;
