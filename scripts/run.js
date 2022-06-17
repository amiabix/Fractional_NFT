const main = async () => {
    const MyNFT = await hre.ethers.getContractFactory('MyNFT');
    const MyToken = await hre.ethers.getContractFactory('MyToken');
    const fractionalNFTcontract = await MyToken.deploy();
    const Mytokencontract = await  MyNFT.deploy();
    await fractionalNFTcontract.deployed();
    await Mytokencontract.deployed();

    console.log("ERC 721 token deployed to:", fractionalNFTcontract.address);
    console.log("Contract  for fractional token deployed to", Mytokencontract.address);

}

const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();