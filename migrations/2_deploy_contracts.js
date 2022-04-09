const ERC20tokens = artifacts.require("./ERC20.sol");
const ERC721tokens = artifacts.require("./ERC721.sol");

const BigNumber = require('bignumber.js')

module.exports = async function(deployer) {
  var initial_supply = new BigNumber(Math.pow(10,25));
  deployer.deploy(ERC20tokens, initial_supply);
  deployer.deploy(ERC721tokens);
};
