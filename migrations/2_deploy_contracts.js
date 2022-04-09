const ERC20tokens = artifacts.require("./GLDToken.sol");

const BigNumber = require('bignumber.js')

module.exports = function(deployer) {
  var initial_supply = new BigNumber(Math.pow(10,25));
  deployer.deploy(ERC20tokens, initial_supply);
};
