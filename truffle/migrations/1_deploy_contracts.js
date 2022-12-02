const ConvertLib = artifacts.require("ConvertLib");
const MetaCoin = artifacts.require("MetaCoin");
const railRoad = artifacts.require("RailRoad");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);

  deployer.deploy(railRoad, "0x46b4171B87cb9F149B18C64F7F6869d0570304C1", 2);

};
