const XYZ = artifacts.require("XYZCoin");

module.exports = function (deployer) {
  deployer.deploy(XYZ);
};