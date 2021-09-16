# Batch relayer with meta transaction

This repository is forked from [Hardhat Hackathon Boilerplate](https://github.com/nomiclabs/hardhat-hackathon-boilerplate).


## Quick start

The first things you need to do are cloning this repository and installing its
dependencies:

```sh
yarn install
```

Once installed, let's run Hardhat's testing network:

```sh
yarn hardhat node
```

Before go to next step please provide following environment variable

```sh
// backend/.env

APP_PORT=3001
APP_GAS_LIMIT=2500000
APP_PAYMASTER_KEY="<your paymaster private key that has enough ETH to pay for gas fee>"
JOB_SCHEDULE="* * * * * *"
```

```sh
// frontend/.env

SKIP_PREFLIGHT_CHECK=true
REACT_APP_RELAYER_URL=http://localhost:3001
```


Then, on a new terminal, go to the repository's root folder and run this to
deploy your contract:

```sh
yarn hardhat run scripts/deploy.js --network localhost
```

Your account need initial token to perform transaction so, run this to
```sh
yarn hardhat --network localhost faucet <-receiver-address->
yarn hardhat --network localhost faucet <-paymaster-address->
```

Start relayer service
```sh
cd backend
yarn
yarn start
```

Finally, we can run the frontend with:

```sh
cd frontend
yarn
yarn start
```

> Note: There's [an issue in `ganache-core`](https://github.com/trufflesuite/ganache-core/issues/650) that can make the `npm install` step fail. 
>
> If you see `npm ERR! code ENOLOCAL`, try running `npm ci` instead of `npm install`.

Open [http://localhost:3000/](http://localhost:3000/) to see your Dapp. You will
need to have [Metamask](https://metamask.io) installed and listening to
`localhost 8545`.


## Troubleshooting


- ` Received invalid block tag X. Latest block number is Y` errors: if you are seeing this error on the `npx hardhat node`
  console, try re-select your Metamask network to localhost then reload the page and connect again.

- `Invalid nonce` errors: if you are seeing this error on the `npx hardhat node`
  console, try resetting your Metamask account. This will reset the account's
  transaction history and also the nonce. Open Metamask, click on your account
  followed by `Settings > Advanced > Reset Account`.

