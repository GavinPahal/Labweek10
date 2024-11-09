import React, { useState, useEffect } from 'react';
import Countries from './components/Countries';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    sortByAlpha: false,
    sortByPopulation: false,
    sortByArea: false,
    selectedContinent: 'All',
    selectedSubregion: 'All'
  });
  const [subregions, setSubregions] = useState([]);

  // Fetch countries data
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
        setSubregions([...new Set(data.map((country) => country.subregion).filter(Boolean))]);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Filter and sort countries
  useEffect(() => {
    let filtered = countries;

    // Filter by continent and subregion
    if (filters.selectedContinent !== 'All') {
      filtered = filtered.filter((country) =>
        country.continents.includes(filters.selectedContinent)
      );
    }
    if (filters.selectedSubregion !== 'All') {
      filtered = filtered.filter((country) => country.subregion === filters.selectedSubregion);
    }

    // Apply sorting
    if (filters.sortByAlpha) {
      filtered.sort((a, b) => a.name.common.localeCompare(b.name.common));
    } else if (filters.sortByPopulation) {
      filtered.sort((a, b) => b.population - a.population);
    } else if (filters.sortByArea) {
      filtered.sort((a, b) => b.area - a.area);
    }

    setFilteredCountries(filtered);
  }, [filters, countries]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>Country of the World</h1>

      {/* Filter Options */}
      <div className="filters">
        <div className="card gray-card">
          <h3>Alpha</h3>
          <label>
            <input
              type="checkbox"
              checked={filters.sortByAlpha}
              onChange={() => setFilters((prev) => ({ ...prev, sortByAlpha: !prev.sortByAlpha }))}
            />
            Alphabetical Order
          </label>
        </div>

        <div className="card gray-card">
          <h3>Top 10</h3>
          <label>
            <input
              type="checkbox"
              checked={filters.sortByPopulation}
              onChange={() => setFilters((prev) => ({ ...prev, sortByPopulation: !prev.sortByPopulation }))}
            />
            By Population
          </label>
          <label>
            <input
              type="checkbox"
              checked={filters.sortByArea}
              onChange={() => setFilters((prev) => ({ ...prev, sortByArea: !prev.sortByArea }))}
            />
            By Area
          </label>
        </div>

        <div className="card gray-card">
          <h3>By Continent</h3>
          <select
            value={filters.selectedContinent}
            onChange={(e) => setFilters((prev) => ({ ...prev, selectedContinent: e.target.value }))}
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

        <div className="card gray-card">
          <h3>By Subregion</h3>
          <select
            value={filters.selectedSubregion}
            onChange={(e) => setFilters((prev) => ({ ...prev, selectedSubregion: e.target.value }))}
            className="small-select"
          >
            <option value="All">Choose Region</option>
            {subregions.map((subregion, index) => (
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
