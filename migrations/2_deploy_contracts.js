const ERCtokens = artifacts.require("./ERC20.sol");

const BigNumber = require('bignumber.js')

module.exports = async function(deployer) {
  var initial_supply = new BigNumber(Math.pow(10,25));
  deployer.deploy(ERCtokens, initial_supply);
};
