const main = async () => {
    const MyNFT = await hre.ethers.getContractFactory('MyNFT');
    const MyToken = await hre.ethers.getContractFactory('MyToken');

    const fractionaltoken  = await MyToken.deploy();
    const Mynft = await  MyNFT.deploy();

    await fractionaltoken.deployed();
    await Mynft.deployed();

    
    console.log("ERC 721 token deployed to:",Mynft.address );
    console.log("Contract  for fractional token deployed to", fractionaltoken.address);

    let mint = await Mynft.safeMint("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266","1");
    await mint.wait();

    console.log("Minted token to address:", mint.address);
    console.log("\n");

    // console.log("msg.sender:", hre.ethers.utils.getAddress(hre.ethers.provider.getSigner().address));
    
        let Approval = await MyNFT.setApprovalForAll(fractionaltoken.address, true);
        await Approval.wait();

    let initialiseContract = await fractionaltoken.initialize(Mynft.address,"1","100000000000");
    await initialiseContract.wait();

    console.log("Initialised contract with address:", mint.address);
    
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