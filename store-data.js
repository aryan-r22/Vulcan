

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

const { initializeApp } = require("firebase/app");

const firebaseConfig = {
  // firebaseConfig
  apiKey: "AIzaSyBmiuNshim2tyyfS7jPi-922pne9bst9uY",
  authDomain: "ucl-tokens.firebaseapp.com",
  projectId: "ucl-tokens",
  storageBucket: "ucl-tokens.appspot.com",
  messagingSenderId: "1054472108491",
  appId: "1:1054472108491:web:0eda7ec813ebb1accc9e4e",
  measurementId: "G-SZWD9EWDTL"
};

initializeApp(firebaseConfig);

const { getFirestore, addDoc, collection } = require("@firebase/firestore");
const db = getFirestore();

async function main() {
  let block_data = [];

  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/12WquzaYH88Y_89RPueGApsIkjpvMLaX");
  const blockNumber = await web3.eth.getBlockNumber();
  const maxP = await web3.eth.getMaxPriorityFeePerGas();
  const gas_price = await web3.eth.getGasPrice();
  block_data.push(blockNumber);
  block_data.push(maxP);
  block_data.push(gas_price);
  return block_data;
 }

const addData = async () => {
  const block_data = await main();
  const ref = collection(db, "transaction_details");
  console.log("The latest block number is: " + block_data[0]);
  console.log("The maxPriorityFee is: " + block_data[1]);
  console.log("The gas_price is: " + block_data[2]);
  await addDoc(ref, {
    block_number: block_data[0],
    max_priority_gas_fee: block_data[1],
    current_gas_price: block_data[2],
  })
    .then(() => console.log("Data Added"))
    .catch((err) => console.log(err));
};

addData();