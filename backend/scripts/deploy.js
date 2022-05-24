async function main() {
   const TOKEN = await ethers.getContractFactory("ERC20_implement");

   // Start deployment, returning a promise that resolves to a contract object
   const token_d = await TOKEN.deploy("10000","10000000000000000000");   


  //const TOKEN = await ethers.getContractFactory("ERC_721full");

  //Start deployment, returning a promise that resolves to a contract object
  //const token_d = await TOKEN.deploy();   
   console.log("Contract deployed to address:", token_d.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });