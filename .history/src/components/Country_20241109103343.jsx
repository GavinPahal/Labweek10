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

  const [borderFlags, setBorderFlags] = useState([]);

  // Fetch border flags
  useEffect(() => {
    if (borders && borders.length > 0) {
      const fetchBorderFlags = async () => {
        try {
          const borderData = await Promise.all(
            borders.map(async (borderCode) => {
              const response = await fetch(`https://restcountries.com/v3.1/alpha/${borderCode}`);
              const data = await response.json();
              return { flag: data[0].flags.png, name: data[0].name.common };
            })
          );
          setBorderFlags(borderData);
        } catch (error) {
          console.error('Error fetching border country data:', error);
        }
      };
      fetchBorderFlags();
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
      <img src={flags.png} alt={`${name.common} flag`} width="100" />
      <h2>{name.common}</h2>
      <p><strong>Official Name:</strong> {name.official}</p>
      <p><strong>Capital:</strong> {capital}</p>
      <p><strong>Population:</strong> {population.toLocaleString()}</p>
      <p><strong>Languages:</strong> {languageNames}</p>
      <p><strong>Currency:</strong> {currencyNames}</p>
      <p><strong>Area (mi²):</strong> {area ? area.toLocaleString() : 'N/A'}</p>
      <p><strong>Subregion:</strong> {subregion || 'N/A'}</p>
      <p><strong>Continents:</strong> {continents.join(', ')}</p>

      {/* Display Bordering Countries and their Flags */}
      <div className="border-countries">
        <strong>Borders:</strong>
        {borderFlags.length > 0 ? (
          borderFlags.map((border, index) => (
            <div key={index} className="border-flag">
              <img src={border.flag} alt={`${border.name} flag`} width="50" />
              <p>{border.name}</p>
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
