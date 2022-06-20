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
    
    console.log("balance of 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266: " + await fractionaltoken.balanceOf(owner_address));

    let trasnfer = await fractionaltoken.transfer("0x70997970C51812dc3A010C7d01b50e0d17dc79C8","100000");
    await trasnfer.wait();

    let balance2 = await fractionaltoken.balanceOf("0x70997970C51812dc3A010C7d01b50e0d17dc79C8");

    console.log("balance of 0x70997970C51812dc3A010C7d01b50e0d17dc79C8: " + balance2);

    console.log("balance of 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266: " + await fractionaltoken.balanceOf(owner_address));

    let forSale = await fractionaltoken.putForsale("100");
    await forSale.wait();

    let purchase = await fractionaltoken.purchase("0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC","100");
    await purchase.wait();
    
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