const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const { async } = require("@firebase/util");

var abi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "multisig_address",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "contract_addr",
        "type": "address"
      }
    ],
    "name": "Deployed_ERC20AMMto",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "contract_addr",
        "type": "address"
      }
    ],
    "name": "Deployed_Treasuryto",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "token_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "token_sym",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "founder_add",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amt",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "reserveRatio",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "proj_hash",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "stable_coin",
        "type": "address"
      }
    ],
    "name": "createNewERC20AMM",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "erc20cts_AMM",
    "outputs": [
      {
        "internalType": "contract ERC20_AMM",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getOwnerAddr",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "treasury",
    "outputs": [
      {
        "internalType": "contract Treasury",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
async function main() {

    // let owner_add = [];
    const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/12WquzaYH88Y_89RPueGApsIkjpvMLaX");
    const address = "0xE1Ae71B181740c12D859A2dDffF8a6936b95f47d";

    const contract = new web3.eth.Contract(abi, address);

    var owner = contract.methods.getOwnerAddr();
    // owner_add.push(owner);
    return owner;
}

const logData = async () => {
    const owner_add = await main();
    console.log(owner_add);
    };

logData();