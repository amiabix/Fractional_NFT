const main = async () => {
    const MyNFT = await hre.ethers.getContractFactory('MyNFT');
    const MyToken = await hre.ethers.getContractFactory('MyToken');

    const fractionaltoken  = await MyToken.deploy();
    const Mynft = await  MyNFT.deploy();

    await fractionaltoken.deployed();
    await Mynft.deployed();

    console.log("\n");

    let owner_address= await fractionaltoken.owner();
    console.log("owner address: " + owner_address);

    console.log("ERC 721 token deployed to:",Mynft.address );
    console.log("Contract  for fractional token deployed to", fractionaltoken.address);

    let mint = await Mynft.safeMint("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266","1");
    await mint.wait();

    console.log("\n");
    
    let Approval = await Mynft.setApprovalForAll(fractionaltoken.address, true);
    await Approval.wait();

    let initialiseContract = await fractionaltoken.initialize(Mynft.address,"1","100000000000");
    await initialiseContract.wait();
    

    let balance = await fractionaltoken.balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    console.log("balance of 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266: " + balance);

    
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