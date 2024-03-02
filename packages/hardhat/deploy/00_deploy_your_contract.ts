import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network goerli`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // await deploy("YourContract", {
  //   from: deployer,
  //   // Contract constructor arguments
  //   args: [deployer],
  //   log: true,
  //   // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
  //   // automatically mining the contract deployment transaction. There is no effect on live networks.
  //   autoMine: true,
  // });

  const rewardsPool = await deploy("RewardsPool", {
    from: deployer,
    // Contract constructor arguments
    args: [deployer],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  const bseaToken = await deploy("BseaToken", {
    from: deployer,
    // Contract constructor arguments
    args: [deployer, deployer],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  const bseaNFT = await deploy("BseaNFT", {
    from: deployer,
    // Contract constructor arguments
    args: [deployer, deployer],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  const minter = await deploy("Minter", {
    from: deployer,
    // Contract constructor arguments
    args: [deployer, rewardsPool.address, bseaToken.address, bseaNFT.address],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  const tokenContract = await hre.ethers.getContract<Contract>("BseaToken", deployer);
  await tokenContract.grantRole(await tokenContract.MINTER_ROLE(), minter.address);

  const nftContract = await hre.ethers.getContract<Contract>("BseaNFT", deployer);
  await nftContract.grantRole(await nftContract.MINTER_ROLE(), minter.address);

  // Get the deployed contract to interact with it after deploying.
  const minterContract = await hre.ethers.getContract<Contract>("Minter", deployer);
  console.log(
    "👋 Rewards pool:",
    await minterContract.rewardsPool(),
    "\n Reward token: ",
    await minterContract.bseaToken(),
    "\n Membership NFT: ",
    await minterContract.bseaNFT(),
  );
};

export default deployYourContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployYourContract.tags = ["YourContract"];
