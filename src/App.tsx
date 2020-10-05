import React, { useState, useEffect } from "react";
import "./App.css";
import LocForm from "./LocForm";
import axios from "axios";

type Loc = {
  city: string;
  state?: string;
  country: string;
};

function App() {
  const initialLocation: Loc = {
    city: "Austin",
    state: "Texas",
    country: "US",
  };

  const [loc, setLoc] = useState(initialLocation);
  const [histData, setHistData] = useState();

  useEffect(() => {
    axios
      .get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/history?&aggregateHours=24&startDateTime=2020-01-01T00:00:00&endDateTime=2020-10-01T00:00:00&unitGroup=us&contentType=json&dayStartTime=0:0:00&dayEndTime=0:0:00&location=Austin,TX,US&locationMode=single&key=${process.env.REACT_APP_API_KEY}`
      )
      .then((res) => {
        setHistData(res.data.location.values);
        console.log(res.data);
      })
      .catch((error) => {
        console.log("problem!", error);
      });
  }, []);

  const handleSubmit = () => {
    axios
      .get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/history?&aggregateHours=24&startDateTime=2019-06-13T00:00:00&endDateTime=2019-06-20T00:00:00&unitGroup=us&contentType=json&dayStartTime=0:0:00&dayEndTime=0:0:00&location=${loc.city},${loc.state},${loc.country}&locationMode=single&key=${process.env.REACT_APP_API_KEY}`
      )
      .then((res) => {
        setHistData(res.data);
        console.log(res.data.location.values);
      })
      .catch((error) => {
        console.log("Houston, we have a problem.", error);
      });

    console.log(loc.city, loc.state, loc.country);
  };

  return (
    <div className="App">
      <LocForm loc={loc} setLoc={setLoc} handleSubmit={handleSubmit} />
    </div>
  );
}

export default App;
