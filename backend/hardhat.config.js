/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
   solidity: {
      version: "0.8.14",
      settings: {
         optimizer: {
            enabled: true,
            runs: 200
         }
      }
   },
   defaultNetwork: "polygon_mumbai",
   networks: {
      hardhat: {},
      polygon_mumbai: {
         url: "https://polygon-mumbai.g.alchemy.com/v2/12WquzaYH88Y_89RPueGApsIkjpvMLaX",
         accounts: [`0xcdf5e8c7aa4ccdfed6677a2327ae58495c44eef987eba9872d1baa59af08393f`]
         
      }
   },
}
