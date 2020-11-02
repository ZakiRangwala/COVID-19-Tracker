import React, { useEffect, useState } from "react";
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
import InfoBox from "./InfoBox.js";
import Map from "./Map.js";
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
      <div className="app__left">
        <div className="app__header">
          {/* Title and Dropdown */}
          <h1>COVID-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {/* Loop through all the countries and find stats based on them */}
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/*3 Information Boxes*/}
        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={123} total={2000} />
          <InfoBox title="Recovered Cases" cases={1123} total={3000} />
          <InfoBox title="Deaths" cases={12313} total={5000} />
        </div>

        {/* Map of cases */}
        <div className="map">
          <Map />
        </div>
      </div>
      <Card className="app__right">
        <CardContent>
          {/* Table of Data*/}
          <h3>Live Cases by country</h3>
          <h3>Worldwide new cases</h3>
        </CardContent>
        {/* Graph of Data */}
      </Card>
    </div>
  );
}

export default App;
