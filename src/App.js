import React, { useEffect, useState } from "react";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import "./App.css";
function App() {
  const [countries, setCountries] = useState([]); //variable and modifiers initialized into an array
  const [country, setCountry] = useState("worldwide");
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

  //Event Listener Function
  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  };

  return (
    <div className="app">
      {/* Header */}
      <div className="app__header">
        {/* Title and Dropdown */}
        <h1>COVID-19 Tracker</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {/* Loop through all the countries and find stats based on them */}
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="app__stats">
        {/*Information title = "Coranavirus Cases" */}
        {/*Information Box title = "Coranavirus Recoveries" */}
        {/*Information Box title = "Coronavirus Deaths" */}
      </div>

      {/* Table of Data*/}
      {/* Graph of Data */}

      {/* Map of cases */}
    </div>
  );
}

export default App;
