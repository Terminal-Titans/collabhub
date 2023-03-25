import React, { useState } from "react";

export default function MultiSelectFilter() {
  const [sportsData, setSportsData] = useState([
    { id: "dev1", sports: "web" },
    { id: "dev2", sports: "app" },
    { id: "dev3", sports: "ml" },
    { id: "dev4", sports: "blockchain" },
  ]);

  const [selectedSports, setSelectedSports] = useState([]);

  // add or remove selected sport from array based on checkbox state
  const handleSportSelection = (sport) => {
    let updatedSelectedSports = [...selectedSports];
    const index = updatedSelectedSports.findIndex(
      (selectedSport) => selectedSport.id === sport.id
    );

    if (index !== -1) {
      updatedSelectedSports.splice(index, 1);
    } else {
      updatedSelectedSports.push(sport);
    }

    setSelectedSports(updatedSelectedSports);
  };

  // clear selected sports array
  const handleClearSelection = () => {
    setSelectedSports([]);
  };

  // render sports dropdown with checkboxes
  const renderSportsDropdown = () => {
    return (
      <div style={{display:"flex",flexDirection:"row"}}>
        {sportsData.map((sport) => (
          <label key={sport.id}>
            <input
              type="checkbox"
              checked={selectedSports.some(
                (selectedSport) => selectedSport.id === sport.id
              )}
              onChange={() => handleSportSelection(sport)}
            />
            {sport.sports}
          </label>
        ))}
      </div>
    );
  };

  // render selected sports array
  const renderSelectedSports = () => {
    return (
      <div style={{ display: "flex", flexDirection: "row", margin: "3px",justifyContent: "center",alignItems:"center" }}>
        {selectedSports.map((sport) => (
          <div
            style={{ display: "flex", flexDirection: "row", margin: "3px",justifyContent: "center",alignItems:"center" }}
            key={sport.id}
          >
            {sport.sports}
          </div>
        ))}
      </div>
    );
  };

  // render method
  return (
    <div>
      <label>Select your Tech Stack:</label>
      {renderSportsDropdown()}

      {/* {selectedSports.length > 0 && (
        <div>
          <h2>Selected sports:</h2>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {renderSelectedSports()}
          </div>
          <button onClick={handleClearSelection}>Clear selection</button>
        </div>
      )} */}
    </div>
  );
}
