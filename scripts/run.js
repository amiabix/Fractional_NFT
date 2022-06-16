const main = async () => {
    const fractionalNFT = await hre.ethers.getContractFactory('MyNFT');
    const fractionalNFTcontract = await fractionalNFT.deploy();
    await fractionalNFTcontract.deployed();

    const Mytoken = await hre.ethers.getContractFactory('Mytoken');
    const Mytokencontract = await Mytoken.deploy();
    await Mytokencontract.deployed();

    console.log("Contract  for fractional token deployed to:", fractionalNFTcontract.address);
    console.log("ERC 721 token deployed to:", Mytokencontract.address);

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