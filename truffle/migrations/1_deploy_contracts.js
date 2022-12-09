const railRoad = artifacts.require("RailRoad");

module.exports = function(deployer) {
  deployer.deploy(railRoad, "0xd688dB1cEe69A824DBFa6b25fE0A79c510835Fa4", 2);
};
