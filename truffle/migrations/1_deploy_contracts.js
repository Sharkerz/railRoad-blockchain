const railRoad = artifacts.require("RailRoad");

module.exports = function(deployer) {
  deployer.deploy(railRoad, "0x238972935dAA7CABa61bafEb815E64044696E014", 2);
};
