import React from 'react';
import Country from './Country';

const Countries = ({ countries }) => {
  console.log(countries); // Log to check if countries data is passed properly
  return (
    <div className="countries-list">
      {countries.map(country => (
        <Country key={country.cca3} country={country} />
      ))}
    </div>
  );
};

export default Countries;
