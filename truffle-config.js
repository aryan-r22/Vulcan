const path = require("path");
var Web3 = require('web3');

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  networks: {
    development: {
      provider: () => {
        const appCred = 'u1oid297cl:HG5Ch-WqWUXPC_9GpQrJ4nmredzzWNVMUB7GcM5Iuvs'; // from application credential widget
        const connectionURL = 'u1hqjx5c8m-u1y7wo7bvu-rpc.us1-azure.kaleido.io'; // without protocol (https://)
        return new Web3.providers.HttpProvider(`https://${appCred}@${connectionURL}`, 100000);
      },
      network_id: "*", // Match any network id
      gasPrice: 0,
      gas: 4500000,
      /* type: 'quorum' // Use this property for Quorum environments */
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",
    }
  }
};
