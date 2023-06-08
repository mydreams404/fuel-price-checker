import React from "react";
import { useState } from "react";

import FuelForm from "./Library/form";
import FuelStationList from "./Library/fuel-station-list";

function App() {
  const access_token = "nmtSve9ahjf9UCJp6R0MJMQfzGUG";
  const api_key = "QjokezG3aTaHgyU6kYWimMyhua3Cjb2x";
  const currentDate = new Date();

  const [fuelPrice, setFuelPrice] = useState("");
  const [fuelType, setFuelType] = useState("");

  const formatDate = (date) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };

    return date.toLocaleString(undefined, options);
  };

  const generateTransactionId = () => {
    const timestamp = Date.now().toString();
    const randomNum = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    return `${timestamp}${randomNum}`;
  };

  const getFuelPriceList = (
    selectedFuels,
    selectedBrands,
    postcode,
    latitude,
    longitude
  ) => {
    const APIBody = {
      fueltype: selectedFuels, //can only select 1 fuel
      brand: selectedBrands,
      namedlocation: postcode,
      latitude: latitude,
      longitude: longitude,
      radius: "",
      sortby: "price",
      sortascending: "true",
    };

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.onegov.nsw.gov.au/FuelPriceCheck/v2/fuel/prices/nearby",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + access_token,
              apikey: api_key,
              transactionid: generateTransactionId(),
              requesttimestamp: formatDate(currentDate),
            },
            body: JSON.stringify(APIBody),
          }
        );
        const data = await response.json();
        console.log(data);

        setFuelPrice(data); //fix this up
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    fetchData();
  };

  const handleSubmit = (formData) => {
    const { selectedFuel, selectedBrands, postcode, latitude, longitude } =
      formData;
    setFuelType(selectedFuel);
    console.log("Form Data: ", formData);
    console.log(selectedBrands);
    // console.log("Selected fuels: ", selectedFuels);
    getFuelPriceList(
      selectedFuel,
      selectedBrands,
      postcode,
      latitude,
      longitude
    );
  };

  return (
    <div style={{ textAlign: "center" }}>
      <br />
      <FuelForm onSubmit={handleSubmit} />
      {fuelPrice && (
        <FuelStationList
          stations={fuelPrice.stations}
          prices={fuelPrice.prices}
          selectedFuelType={fuelType}
        />
      )}
      <br />
    </div>
  );
}

export default App;
