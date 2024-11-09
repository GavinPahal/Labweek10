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

  // Fetch border country names
  useEffect(() => {
    if (borders?.length) {
      Promise.all(
        borders.map((borderCode) =>
          fetch(`https://restcountries.com/v3.1/alpha/${borderCode}`)
            .then((response) => response.json())
            .then((data) => data[0].name.common)
        )
      )
        .then(setBorderNames)
        .catch((error) => console.error('Error fetching border country data:', error));
    }
  }, [borders]);

  // Helper functions to extract currencies and languages
  const extractNames = (obj) => (obj ? Object.values(obj).map((item) => item.name).join(', ') : 'N/A');

  return (
    <div className="country-card">
      <div className="country-header">
        <img src={flags.png} alt={`${name.common} flag`} width="50" />
        <h2>{name.common}</h2>
      </div>
      <p><strong>Official Name:</strong> {name.official}</p>
      <p><strong>Capital:</strong> {capital || 'N/A'}</p>
      <p><strong>Population:</strong> {population?.toLocaleString() || 'N/A'}</p>
      <p><strong>Languages:</strong> {extractNames(languages)}</p>
      <p><strong>Currency:</strong> {extractNames(currencies)}</p>
      <p><strong>Area (mi²):</strong> {area?.toLocaleString() || 'N/A'}</p>
      <p><strong>Subregion:</strong> {subregion || 'N/A'}</p>
      <p><strong>Continents:</strong> {continents.join(', ')}</p>

      {/* Display Bordering Countries */}
      <div className="border-countries">
        <strong>Borders:</strong>
        <p>{borderNames.length ? borderNames.join(', ') : 'None'}</p>
      </div>
    </div>
  );
};

export default Country;
