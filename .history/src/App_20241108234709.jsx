import React, { useState, useEffect } from 'react';
import Countries from './components/Countries';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortByPopulation, setSortByPopulation] = useState(false);
  const [sortByArea, setSortByArea] = useState(false);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        setCountries(data);
        setFilteredCountries(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>Country Data</h1>

      {/* Top 10 Card */}
      <div className="card">
        <h3>Top 10</h3>
        <div className="options">
          <label>
            <input
              type="checkbox"
              checked={sortByPopulation}
              onChange={(e) => setSortByPopulation(e.target.checked)}
            />
            By Population
          </label>
          <label>
            <input
              type="checkbox"
              checked={sortByArea}
              onChange={(e) => setSortByArea(e.target.checked)}
            />
            By Area
          </label>
        </div>
      </div>

      {/* Filter Cards */}
      <div className="card">
        <h3>By Continent</h3>
      </div>
      <div className="card">
        <h3>All</h3>
      </div>
      <div className="card">
        <h3>By Subregion</h3>
      </div>
      <div className="card">
        <h3>Choose Region</h3>
      </div>

      <Countries countries={filteredCountries} />
    </div>
  );
};

export default App;
