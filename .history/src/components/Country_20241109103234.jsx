import React from 'react';

const Country = ({ country }) => {
  const { flags, name } = country;

  return (
    <div className="country-card">
      {flags && flags.svg ? (
        <img src={flags.svg} alt={`${name.common} flag`} className="country-flag" />
      ) : (
        <p>Flag not available</p>
      )}
      <h2>{name.common}</h2>
    </div>
  );
};

export default Country;
