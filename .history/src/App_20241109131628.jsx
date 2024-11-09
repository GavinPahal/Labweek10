{/* By Subregion Dropdown */}
<div className="card gray-card">
  <h3>By Subregion</h3>
  <select
    value={selectedSubregion}
    onChange={(e) => setSelectedSubregion(e.target.value)}
    className="small-select"
  >
    {subregions.map((subregion, index) => (
      <option key={index} value={subregion}>
        {subregion}
      </option>
    ))}
  </select>
</div>
