import React from 'react';

const FilterCards = () => {
  const filters = ['Alpha', 'Top 10', 'By Population', 'By Area', 'By Continent', 'All', 'By Subregion', 'Choose Region'];

  return (
    <div className="filter-cards">
      {filters.map((filter, index) => (
        <div key={index} className="filter-card">
          {filter}
        </div>
      ))}
    </div>
  );
};

export default FilterCards;
