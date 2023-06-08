import React, { useState } from "react";

const fuels = [
  { value: "E10-U91", label: "Ethanol 94 / Unleaded 91" },
  { value: "E10", label: "Ethanol 94" },
  { value: "U91", label: "Unleaded 91" },
  { value: "E85", label: "Ethanol 105" },
  { value: "P95-P98", label: "Premium 95 / Premium 98" },
  { value: "P95", label: "Premium 95" },
  { value: "P98", label: "Premium 98" },
  { value: "DL-PDL", label: "Diesel / Premium Diesel" },
  { value: "DL", label: "Diesel" },
  { value: "PDL", label: "Premium Diesel" },
  { value: "B20", label: "Biodiesel 20" },
  { value: "EV", label: "EV charge" },
  { value: "LPG", label: "LPG" },
  { value: "LNG", label: "LNG" },
  { value: "H2", label: "Hydrogen" },
  { value: "CNG", label: "CNG/NGV" },
];

const brandsData = [
  { name: "7-Eleven", state: "NSW" },
  { name: "Ampol", state: "NSW" },
  { name: "BP", state: "NSW" },
  { name: "Budget", state: "NSW" },
  { name: "Caltex", state: "NSW" },
  { name: "Caltex Woolworths", state: "NSW" },
  { name: "ChargePoint", state: "NSW" },
  { name: "Chargefox", state: "NSW" },
  { name: "Coles Express", state: "NSW" },
  { name: "Costco", state: "NSW" },
  { name: "EG Ampol", state: "NSW" },
  { name: "EVUp", state: "NSW" },
  { name: "Enhance", state: "NSW" },
  { name: "Everty", state: "NSW" },
  { name: "Evie Networks", state: "NSW" },
  { name: "Independent", state: "NSW" },
  { name: "Independent EV", state: "NSW" },
  { name: "Inland Petroleum", state: "NSW" },
  { name: "JOLT", state: "NSW" },
  { name: "Liberty", state: "NSW" },
  { name: "Lowes", state: "NSW" },
  { name: "Metro Fuel", state: "NSW" },
  { name: "Mobil", state: "NSW" },
  { name: "NRMA", state: "NSW" },
  { name: "Puma Energy", state: "NSW" },
  { name: "Shell", state: "NSW" },
  { name: "South West", state: "NSW" },
  { name: "Speedway", state: "NSW" },
  { name: "Tesla", state: "NSW" },
  { name: "Transwest Fuels", state: "NSW" },
  { name: "United", state: "NSW" },
  { name: "Westside", state: "NSW" },
  { name: "Woodham Petroleum", state: "NSW" },
];

const FuelForm = ({ onSubmit }) => {
  const [selectedFuel, setSelectedFuel] = useState("E10-U91");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [postcode, setPostcode] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleFuelChange = (event) => {
    setSelectedFuel(event.target.value);
  };

  const handleCheckboxChange = (event, type) => {
    const { value, checked } = event.target;

    if (type === "brand") {
      if (value === "selectAll") {
        if (checked) {
          setSelectedBrands(brandsData.map((brand) => brand.name));
        } else {
          setSelectedBrands([]);
        }
      } else {
        if (checked) {
          setSelectedBrands((prevSelectedBrands) => [
            ...prevSelectedBrands,
            value,
          ]);
        } else {
          setSelectedBrands((prevSelectedBrands) =>
            prevSelectedBrands.filter((brand) => brand !== value)
          );
        }
      }
    }
  };

  const handleLatitudeChange = (event) => {
    setLatitude(event.target.value);
  };

  const handleLongitudeChange = (event) => {
    setLongitude(event.target.value);
  };

  const handlePostcodeChange = (event) => {
    setPostcode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      selectedFuel,
      selectedBrands,
      postcode,
      latitude,
      longitude,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <p>Select a fuel type.</p>
        <select value={selectedFuel} onChange={handleFuelChange}>
          {fuels.map((fuel) => (
            <option key={fuel.value} value={fuel.value}>
              {fuel.label}
            </option>
          ))}
        </select>
      </div>
      <br />
      <div>
        <p>Select a brand.</p>
        <label>
          <input
            type="checkbox"
            value="selectAll"
            checked={selectedBrands.length === brandsData.length}
            onChange={(event) => handleCheckboxChange(event, "brand")}
          />
          Select All Brands
        </label>
        {brandsData.map((brand) => (
          <div key={brand.name}>
            <label>
              <input
                type="checkbox"
                value={brand.name}
                checked={selectedBrands.includes(brand.name)}
                onChange={(event) => handleCheckboxChange(event, "brand")}
              />
              {brand.name}
            </label>
          </div>
        ))}
      </div>
      <br />
      <div>
        <p>Enter the postcode of the location.</p>
        <input type="text" value={postcode} onChange={handlePostcodeChange} />
      </div>
      <div>
        <p>Enter latitude and longitude for the location. </p>
        <label>Latitude: </label>
        <input type="number" value={latitude} onChange={handleLatitudeChange} />
        <label>Longitude: </label>
        <input
          type="number"
          value={longitude}
          onChange={handleLongitudeChange}
        />
      </div>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FuelForm;
