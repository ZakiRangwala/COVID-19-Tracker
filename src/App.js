import React, { useEffect, useState } from "react";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import "./App.css";
function App() {
  const [countries, setCountries] = useState([]); //variable and modifiers initialized into an array
  // STATE = How to write a variable in REACT <<<<<
  // useeffect = runs piece of code based on a condition (if statement)

  useEffect(() => {
    //Code in here will run once when component loads, not again
    //Will run each time param variable changes
    //async -> send a request, wait for it, do something with it
    const getCountriesData = async () => {
      //make a promise to recieve request then do something
      await fetch("https://disease.sh/v3/covid-19/countries") //await means to wait for Data
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            //map loops trhrough array and is mutable
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);
  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19 Tracker</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value="abc">
            {/* Loop through all the countries and find stats based on them */}
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
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
