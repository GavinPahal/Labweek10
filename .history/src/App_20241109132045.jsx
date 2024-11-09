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
  const [selectedSubregion, setSelectedSubregion] = useState('All');
  const [subregions, setSubregions] = useState([]);

  // Fetch countries data
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);

        // Extract unique subregions
        const uniqueSubregions = [
          ...new Set(data.map((country) => country.subregion)),
        ];
        setSubregions(uniqueSubregions);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Filter and sort countries based on selected options
  useEffect(() => {
    let sortedCountries = [...countries];

    // Filter by continent
    if (selectedContinent !== 'All') {
      sortedCountries = sortedCountries.filter((country) =>
        country.continents.includes(selectedContinent)
      );
    }

    // Filter by subregion
    if (selectedSubregion !== 'All') {
      sortedCountries = sortedCountries.filter((country) =>
        country.subregion === selectedSubregion
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
  }, [sortByAlpha, sortByPopulation, sortByArea, countries, selectedContinent, selectedSubregion]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>Country of the World</h1>

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
            <option value="Antarctica">Antarctica</option>
            <option value="North America">North America</option>
            <option value="Europe">Europe</option>
            <option value="Africa">Africa</option>
            <option value="Asia">Asia</option>
            <option value="Oceania">Oceania</option>
            <option value="South America">South America</option>
          </select>
        </div>

        {/* By Subregion Dropdown */}
        <div className="card gray-card">
          <h3>By Subregion</h3>
          <select
            value={selectedSubregion}
            onChange={(e) => setSelectedSubregion(e.target.value)}
            className="small-select"
          >
            <option value="All">Choose Region</option>
            {subregions
              .filter((subregion) => subregion !== 'Caribbean') // Remove Caribbean from options
              .map((subregion, index) => (
                <option key={index} value={subregion}>
                  {subregion}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Display Country Data */}
      <Countries countries={filteredCountries} />
    </div>
  );
};

export default App;
