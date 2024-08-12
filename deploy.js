const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

const abi = fs.readJsonSync("artifacts/contracts/SimpleStorage.sol/SimpleStorage.json").abi;
const bytecode = fs.readJsonSync("artifacts/contracts/SimpleStorage.sol/SimpleStorage.json").bytecode;
async function main(){
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC);
/*     const wallet = new ethers.Wallet(
        process.env.PRIVATE_KEY,
        provider
    ); */
    const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8");
    let wallet = new ethers.Wallet.fromEncryptedJsonSync(
        encryptedJson,
        process.env.PRIVATE_KEY_PASSWORD
    );

    wallet = wallet.connect(provider);
    const balance = await wallet.getBalance();
    console.log(`Wallet Address: ${wallet.address}`);
    console.log(`Wallet balance: ${ethers.utils.formatEther(balance)} ETH`);
    const factory = new ethers.ContractFactory(abi, bytecode, wallet);
    console.log("Deploying contract...");
    const contract = await factory.deploy({
        gasPrice: ethers.utils.parseUnits("20", "gwei"),
        gasLimit: 3000000
    });
    await contract.deployTransaction.wait(1);
    console.log(`Contract deployed to: https://sepolia.etherscan.io/address/${contract.address}`);
    
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