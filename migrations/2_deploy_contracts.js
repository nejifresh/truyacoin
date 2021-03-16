const TruyaToken = artifacts.require("TruyaToken");

module.exports = function (deployer) {
  deployer.deploy(TruyaToken, 100000000);
};
