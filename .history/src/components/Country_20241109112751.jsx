import React from 'react';

const Country = ({ country }) => {
  const {
    flags,
    name,
    capital,
    population,
    area,
    continents,
  } = country;

  return (
    <div className="country-card">
      <div className="country-header">
        <img src={flags.png} alt={`${name.common} flag`} width="50" />
        <h2>{name.common}</h2>
      </div>
      <p><strong>Capital:</strong> {capital}</p>
      <p><strong>Population:</strong> {population.toLocaleString()}</p>
      <p><strong>Area (mi²):</strong> {area ? area.toLocaleString() : 'N/A'}</p>
      <p><strong>Continents:</strong> {continents.join(', ')}</p>
    </div>
  );
};

export default Country;
