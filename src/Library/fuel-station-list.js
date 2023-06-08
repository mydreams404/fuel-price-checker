import React from "react";

const FuelStationList = ({ stations, prices, selectedFuelType }) => {
  return (
    <div>
      <br />
      <h2>Servos in your area:</h2>
      {stations.map((station, stationIndex) => {
        const filteredPrices = prices.filter(
          (price) =>
            price.stationcode === station.code &&
            price.fueltype === selectedFuelType
        );

        return (
          <div key={stationIndex}>
            <strong>{station.name}</strong>
            {filteredPrices.map((price, priceIndex) => (
              <p key={priceIndex}>
                Fuel: {price.fueltype}, Price: {price.price} {price.priceunit}
              </p>
            ))} 
          </div>
        );
      })}
    </div>
  );
};

export default FuelStationList;
