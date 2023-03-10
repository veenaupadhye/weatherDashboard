import React, { useState } from "react";
import DisplayWeatherInfo from "./DisplayWeatherInfo";
import "./Weather.css";

function Weather() {
  const [form, setForm] = useState("");
  const [weather, setWeather] = useState({});

  async function getWeatherData(e) {
    e.preventDefault();
    if (form === "") {
      alert("No Data Found");
    } else {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${form}&units=metric&appid=e6114a74f8a41ebc696d5d7be5c28acc`;

      const response = await fetch(url);
      const resJson = await response.json();

      if (resJson.message !== "city not found") {
        // console.log("form", form);
        setWeather({
          data: resJson,
        });
      }
    }
  }

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    // console.log("name: " + name, "value: " + value);
    if (name === "city") {
      setForm(value);
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="weather">
      <h1 className="app-name">Weather App</h1>
      <br />
      <form>
        <input
          type="text"
          placeholder="Enter City Name"
          name="city"
          onChange={(e) => handleChange(e)}
          autoFocus
        />
        &nbsp; &nbsp;
        <button
          className="weather-btn bg-gradient-to-r from-cyan-500 to-blue-500"
          onClick={(e) => getWeatherData(e)}
        >
          Add
        </button>
        &nbsp; &nbsp;
        <button
          className="reload-btn bg-gradient-to-r from-cyan-500 to-blue-500 "
          onClick={refreshPage}
        >
          Reload
        </button>
      </form>
      {weather.data !== undefined ? (
        <div className="grid md:grid-cols-3  sm:grid-cols-1">
          <DisplayWeatherInfo data={weather.data} />
        </div>
      ) : null}
    </div>
  );
}

export default Weather;
