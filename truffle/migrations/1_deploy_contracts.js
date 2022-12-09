const railRoad = artifacts.require("RailRoad");

module.exports = function(deployer) {
  deployer.deploy(railRoad, "0x291C586b9EC7740843580a8875F18403596dC1AF", 2);
};
