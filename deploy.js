const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

const abi = fs.readJsonSync("artifacts/contracts/SimpleStorage.sol/SimpleStorage.json").abi;
const bytecode = fs.readJsonSync("artifacts/contracts/SimpleStorage.sol/SimpleStorage.json").bytecode;
async function main(){
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC);
    const wallet = new ethers.Wallet(
        process.env.PRIVATE_KEY,
        provider
    );
    const factory = new ethers.ContractFactory(abi, bytecode, wallet);
    const contract = await factory.deploy();
    await contract.deployTransaction.wait(1);
    
    const currentFavoriteNumber = await contract.retrieve();
    console.log(`Current Favorite Number: ${currentFavoriteNumber.toString()}`);
    const newFavoriteNumber = await contract.store(31);
    const favoriteNumberReceipt = await newFavoriteNumber.wait(1);
    const updateFavoriteNumber = await contract.retrieve();
    console.log(`Updated Favorite Number: ${updateFavoriteNumber.toString()}`);
    console.log(favoriteNumberReceipt);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });