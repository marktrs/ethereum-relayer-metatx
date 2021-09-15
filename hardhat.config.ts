import "hardhat-gas-reporter"
import "@nomiclabs/hardhat-waffle";
import "hardhat-gas-reporter"
import "./tasks/faucet";

export default {
  solidity: "0.8.0",
  gasReporter: {
    enable: true
  }
};
