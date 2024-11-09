import React, { useState, useEffect } from 'react';

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

  const [borderNames, setBorderNames] = useState([]);

  // Fetch border country names only
  useEffect(() => {
    if (borders && borders.length > 0) {
      const fetchBorderNames = async () => {
        try {
          const borderData = await Promise.all(
            borders.map(async (borderCode) => {
              const response = await fetch(`https://restcountries.com/v3.1/alpha/${borderCode}`);
              const data = await response.json();
              return data[0].name.common;
            })
          );
          setBorderNames(borderData);
        } catch (error) {
          console.error('Error fetching border country data:', error);
        }
      };
      fetchBorderNames();
    }
  }, [borders]);

  // Extract currency names
  const currencyNames = currencies
    ? Object.values(currencies).map((currency) => currency.name).join(', ')
    : 'N/A';

  // Extract languages
  const languageNames = languages ? Object.values(languages).join(', ') : 'N/A';

  // Google Maps link
  const googleMapsUrl = `https://www.google.com/maps?q=${capital}`;

  return (
    <div className="country-card">
      <div className="country-header">
        <img src={flags.png} alt={`${name.common} flag`} width="50" />
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

      {/* Display Bordering Countries without Flags */}
      <div className="border-countries">
        <strong>Borders:</strong>
        {borderNames.length > 0 ? (
          <p>{borderNames.join(', ')}</p>
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
