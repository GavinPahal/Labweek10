import React, { useState, useEffect } from 'react';
import Countries from './components/Countries';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortByPopulation, setSortByPopulation] = useState(false);
  const [sortByArea, setSortByArea] = useState(false);
  const [sortByAlpha, setSortByAlpha] = useState(false);
  const [selectedContinent, setSelectedContinent] = useState('All');

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    let sortedCountries = [...countries];

    // Filter by continent if one is selected
    if (selectedContinent !== 'All') {
      sortedCountries = sortedCountries.filter((country) =>
        country.continents.includes(selectedContinent)
      );
    }

    // Apply sorting
    if (sortByAlpha) {
      sortedCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));
    } else if (sortByPopulation) {
      sortedCountries.sort((a, b) => b.population - a.population);
    } else if (sortByArea) {
      sortedCountries.sort((a, b) => b.area - a.area);
    }

    setFilteredCountries(sortedCountries);
  }, [sortByAlpha, sortByPopulation, sortByArea, countries, selectedContinent]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>Country Data</h1>

      {/* Filter Options Row */}
      <div className="filters">
        {/* Alpha Sorting */}
        <div className="card gray-card">
          <h3>Alpha</h3>
          <label>
            <input
              type="checkbox"
              checked={sortByAlpha}
              onChange={(e) => setSortByAlpha(e.target.checked)}
            />
            Alphabetical Order
          </label>
        </div>

        {/* Top 10 Sorting */}
        <div className="card gray-card">
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

        {/* By Continent Dropdown */}
        <div className="card gray-card">
          <h3>By Continent</h3>
          <select
            value={selectedContinent}
            onChange={(e) => setSelectedContinent(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Africa">Africa</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
            <option value="Americas">Americas</option>
            <option value="Antarctica">Antarctica</option>
          </select>
        </div>
      </div>

      {/* Display Country Data */}
      <Countries countries={filteredCountries} />
    </div>
  );
};

export default App;
