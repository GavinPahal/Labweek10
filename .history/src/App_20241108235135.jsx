import React, { useState, useEffect } from 'react';
import Countries from './components/Countries';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortByPopulation, setSortByPopulation] = useState(false);
  const [sortByArea, setSortByArea] = useState(false);
  const [sortByAlpha, setSortByAlpha] = useState(false);  // New state for sorting alphabetically

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

  // Handle sorting based on different criteria
  useEffect(() => {
    let sortedCountries = [...countries];
    
    if (sortByAlpha) {
      sortedCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));  // Sort alphabetically by country name
    } else if (sortByPopulation) {
      sortedCountries.sort((a, b) => b.population - a.population);  // Sort by population
    } else if (sortByArea) {
      sortedCountries.sort((a, b) => b.area - a.area);  // Sort by area
    }

    setFilteredCountries(sortedCountries);
  }, [sortByAlpha, sortByPopulation, sortByArea, countries]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>Country Data</h1>

      {/* Filter Options Row */}
      <div className="filters">
        {/* Alpha Card */}
        <div className="card">
          
          <label>
            <input
              type="checkbox"
              checked={sortByAlpha}
              onChange={(e) => setSortByAlpha(e.target.checked)}
            />
            Alpha
          </label>
        </div>

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

        {/* Other Filter Cards */}
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
      </div>

      {/* Display Country Data */}
      <Countries countries={filteredCountries} />
    </div>
  );
};

export default App;
