const railRoad = artifacts.require("RailRoad");

module.exports = function(deployer) {
  deployer.deploy(railRoad, "0xdaeC5Aa8033ac418cAFdF1C163d9047239910750", 2);
};
