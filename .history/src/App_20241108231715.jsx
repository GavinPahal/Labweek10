import React, { useState, useEffect } from 'react';
import Countries from './components/Countries';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [displayedCountries, setDisplayedCountries] = useState([]);
  const [filterOption, setFilterOption] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [continentFilter, setContinentFilter] = useState('');
  const [subregionFilter, setSubregionFilter] = useState('');

  // Fetch country data from the REST API on component mount
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        setCountries(data);
        setDisplayedCountries(data);
      })
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  // Filter by continent or subregion
  const handleContinentFilter = (continent) => {
    setContinentFilter(continent);
    setSubregionFilter('');
    setDisplayedCountries(countries.filter(country => country.continents.includes(continent)));
  };

  const handleSubregionFilter = (subregion) => {
    setSubregionFilter(subregion);
    setContinentFilter('');
    setDisplayedCountries(countries.filter(country => country.subregion === subregion));
  };

  // Sort and Top 10 filters
  const handleSort = (type) => {
    let sortedCountries;
    if (type === 'alpha') {
      sortedCountries = [...displayedCountries].sort((a, b) => a.name.common.localeCompare(b.name.common));
    } else if (type === 'population') {
      sortedCountries = [...displayedCountries].sort((a, b) => b.population - a.population).slice(0, 10);
    } else if (type === 'area') {
      sortedCountries = [...displayedCountries].sort((a, b) => b.area - a.area).slice(0, 10);
    }
    setDisplayedCountries(sortedCountries);
  };

  // Reset Filters
  const resetFilters = () => {
    setDisplayedCountries(countries);
    setContinentFilter('');
    setSubregionFilter('');
    setSortOption('');
  };

  return (
    <div className="App">
      <h1>Countries of the World</h1>
      
      <div className="filters">
        <button onClick={() => handleSort('alpha')}>Alpha</button>
        <button onClick={() => handleSort('population')}>Top 10 by Population</button>
        <button onClick={() => handleSort('area')}>Top 10 by Area</button>
        
        <button onClick={() => handleContinentFilter('Africa')}>By Continent: Africa</button>
        <button onClick={() => handleContinentFilter('Asia')}>By Continent: Asia</button>
        
        <button onClick={resetFilters}>All</button>
        
        <div>
          <label>By Subregion: </label>
          <select onChange={(e) => handleSubregionFilter(e.target.value)}>
            <option value="">Choose region</option>
            <option value="Caribbean">Caribbean</option>
            <option value="Western Europe">Western Europe</option>
            {/* Add other subregion options as needed */}
          </select>
        </div>
      </div>

      <Countries countries={displayedCountries} />
    </div>
  );
}

export default App;
