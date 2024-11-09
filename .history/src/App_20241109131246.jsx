<div className="container">
  <h1>Country Data</h1>

  {/* Filter Options Row */}
  <div className="filters">
    {/* Alpha Sorting */}
    <div className="card gray-card">
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
      <select
        value={selectedSubregion}
        onChange={(e) => setSelectedSubregion(e.target.value)}
      >
        <option value="All">All</option>
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
