const railRoad = artifacts.require("RailRoad");

module.exports = function(deployer) {
  deployer.deploy(railRoad, "0xedb20A0fD1F72C0aE0D8953EdB94BB8c0Cc0b009", 2);
};
