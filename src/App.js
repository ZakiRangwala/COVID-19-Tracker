import React, { useEffect, useState } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox.js";
import Map from "./Map.js";
import Table from "./Table.js";
import { sortData } from "./util.js";
import LineGraph from "./LineGraph.js";
import "leaflet/dist/leaflet.css";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]); //variable and modifiers initialized into an array
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  // STATE = How to write a variable in REACT <<<<<
  // useeffect = runs piece of code based on a condition (if statement)

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

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

          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  //Event Listener Function
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
    // pull information from database
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
          <InfoBox
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered Cases"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>

        {/* Map of cases */}
        <div className="map">
          <Map center={mapCenter} zoom={mapZoom} />
        </div>
      </div>
      <Card className="app__right">
        <CardContent>
          {/* Table of Data*/}
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          {/* Graph of Data */}
          <h3>New Cases Worldwide</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
