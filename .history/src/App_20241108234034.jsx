import React, { useState, useEffect } from 'react';
import Countries from './components/Countries';
import './App.css'; // Ensure your CSS is applied

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

  const filterByContinent = (continent) => {
    const filtered = countries.filter(country => country.continents[0] === continent);
    setFilteredCountries(filtered);
  };

  const filterBySubregion = (subregion) => {
    const filtered = countries.filter(country => country.subregion === subregion);
    setFilteredCountries(filtered);
  };

  const sortTop10 = () => {
    let sorted = [...countries];
    if (sortByPopulation) {
      sorted = sorted.sort((a, b) => b.population - a.population);
    }
    if (sortByArea) {
      sorted = sorted.sort((a, b) => b.area - a.area);
    }
    setFilteredCountries(sorted.slice(0, 10)); // Show top 10 based on selected sort option
  };

  const sortAlphabetically = () => {
    const sorted = [...countries].sort((a, b) => a.name.common.localeCompare(b.name.common));
    setFilteredCountries(sorted);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Country Data</h1>

      {/* Top 10 Card */}
      <div className="card">
        <button onClick={sortTop10}>Top 10</button>
        <div>
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
        <button onClick={() => filterByContinent('Africa')}>By continent</button>
        <button onClick={() => setFilteredCountries(countries)}>All</button>
        <button onClick={() => filterBySubregion('Southern Asia')}>By subregion</button>
        <button>Choose region</button>
      </div>

      <Countries countries={filteredCountries} />
    </div>
  );
};

export default App;
