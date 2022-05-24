// scripts/greet.js

const hre = require("hardhat");
const ContractJson = require("../artifacts/contracts/ERC20_implement.sol/ERC20_implement.json");
// The ABI is very important -- it's the interface to your contract, including
// the different available functions that are exposed for other contracts,
// accounts, etc. to call.
const abi = ContractJson.abi;

async function main() {
    // Notice that we're using process.env.ALCHEMY_API_KEY to load an
    // environment variable. If you are seeing errors, make sure to go
    // back to Step 12 and 13 to set up the dotenv dependency and .env
    // file correctly!
    const alchemy = new hre.ethers.providers.AlchemyProvider(
        'maticmum',
        '12WquzaYH88Y_89RPueGApsIkjpvMLaX'
    );
    // We're using the same wallet private key for the wallet that you
    // created in Step 6. 
    const userWallet = new hre.ethers.Wallet('0xcdf5e8c7aa4ccdfed6677a2327ae58495c44eef987eba9872d1baa59af08393f', alchemy);

    // Get the deployed contract. We need both the specific CONTRACT_ADDRESS
    const Greeter = new hre.ethers.Contract(
        //'0x6aC72FE4b1e50A8cBfA957C7609aD010E82C811c',
        //'0x8e72381914da4d2ddc5afcd221f89d9748b29e28',
        '0xa8177bBa20bAa95f519e538A63139F1B4e88b20E',
        abi,
        userWallet
    )

    // We're going to issue two write-transactions to modify the state
    // of the Polygon blockchain via our Greeter smart contract.
    
    // The first transaction sets a new greeting with setGreeting, and then
    // waits for the transaction to be mined before doing a sanity
    // check and checking the new greeting state.
    const setTx1 = await Greeter.totalSupply();
    //await setTx1.wait();
    console.log(setTx1);

    // The second transaction does the exact same thing with a new input.
   // const setTx2 = await Greeter.setGreeting("web3 is awesome!");
   // await setTx2.wait();
    //console.log("after: " + await Greeter.greet());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
