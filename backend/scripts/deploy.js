async function main() {
  //  const TOKEN = await ethers.getContractFactory("ERC20AMM_Factory");

  //  // Start deployment, returning a promise that resolves to a contract object
  //  const token_d = await TOKEN.deploy("0xbd357fD1f99a90d68484C9D90a027B8e1aC71D42");   
  //  console.log("ERC20 Factory Contract deployed to address:", token_d.address);


  // const TOKEN1 = await ethers.getContractFactory("ERC721_Factory");

  // //Start deployment, returning a promise that resolves to a contract object
  // const token_d1 = await TOKEN1.deploy("0xbd357fD1f99a90d68484C9D90a027B8e1aC71D42");
  // console.log("ERC721 Factory Contract deployed to address:", token_d1.address);

  const TOKEN2 = await ethers.getContractFactory("ERC20_Peg");

  //Start deployment, returning a promise that resolves to a contract object
  const token_d2 = await TOKEN2.deploy("LOLcoin", "LOL", "0xbd357fD1f99a90d68484C9D90a027B8e1aC71D42",
    "0xbd357fD1f99a90d68484C9D90a027B8e1aC71D42", "1000000000000000000000000", { gasPrice: 30000000000 });
  console.log("ERC20 Contract deployed to address:", token_d2.address);


}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });