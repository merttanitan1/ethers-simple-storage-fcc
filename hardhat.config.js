const { outputFile } = require('fs-extra');

/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config();
require("@nomiclabs/hardhat-waffle");
require("@nomicfoundation/hardhat-verify");
require('hardhat-gas-reporter');

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;

module.exports = {
  solidity: {
    version: "0.8.20",
  },
  networks: {
    ganache: {
      url: 'http://127.0.0.1:7545',
      chainId: 5777
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      chainId: 11155111,
    }
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.API_KEY,
    },
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: "MATIC",
  },
};
