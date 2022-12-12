const railRoad = artifacts.require("RailRoad");

module.exports = function(deployer) {
  deployer.deploy(railRoad, "0x2162990345c5Cd5cDa3D177756Cf4f69E97EDe54", 2);
};
