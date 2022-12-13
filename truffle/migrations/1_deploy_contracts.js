const railRoad = artifacts.require("RailRoad");

module.exports = function(deployer) {
  deployer.deploy(railRoad, "0x22baC7709aBDe9b935E8c8Af19B46C53790E5C42", 2);
};
