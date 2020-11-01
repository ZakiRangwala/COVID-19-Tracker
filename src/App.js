import "./App.css";
import React, { useState } from "react";
import { MenuItem, FormControl, Select } from "@material-ui/core";

function App() {
  const [countries, setCountries] = useState(["USA", "UK", "INDIA"]); //variable and modifiers initialized into an array

  //STATE = How to write a variable in REACT <<<<<
  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19 Tracker</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value="abc">
            {/* Loop through all the countries and find stats based on them */}

            {countries.map((country) => {
              <MenuItem value={country}>{country}</MenuItem>;
            })}
            
            {/* <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">India</MenuItem>
            <MenuItem value="worldwide">Canada</MenuItem>
            <MenuItem value="worldwide">U.S.A</MenuItem> */}
          </Select>
        </FormControl>
      </div>

      {/* Header */}
      {/* Title and Dropdown */}

      {/* 3 Information Boxes */}

      {/* Table of Data*/}
      {/* Graph of Data */}

      {/* Map of cases */}
    </div>
  );
}

export default App;
