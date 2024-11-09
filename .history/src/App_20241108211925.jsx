import React, { useState, useEffect } from 'react';
import Countries from './components/Countries';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState({ continent: '', subregion: '' });
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => setCountries(data));
  }, []);

  const handleFilterChange = (newFilter) => {
    // Logic for clearing filters based on active filter
  };

  const handleSort = (option) => {
    // Sorting logic
  };

  return (
    <div>
      {/* Filtering and sorting controls here */}
      <Countries countries={filteredAndSortedCountries} />
    </div>
  );
}

export default App;
