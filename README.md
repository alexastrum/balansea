# Balansea

Do what's good for you, the rewards will follow.

## Litepaper

Balansea is a decentralized application (dApp) that allows users to accelerate hitting their mindfulness goals by leveraging the power of blockchain technology to incentivize and reward users for consistent daily mindfulness practice.

We have 2 rewards pool that are funded by a Balansea premium subscription. Premium status is tracked using Balansea's membership NFTs.

The first pool is the daily rewards pool for our premium users. The second pool is a rewards pool for all our users, and it's formed by transfering unclaimed daily rewards from the first pool.

Balansea will use cross-chain swapping protocol (eg. 0x) on Ethereum / L2 blockchains to capture liquidity, and direct it to our L2 of choice, which also stores achievements and rewards. We utilize LivePeer to store media. We plan to use EthStorage to store all other content. We use Livepeer to stream live or pre-recorded meditation sessions. We might use the VRF (eg. Chainlink) to generate random rewards for the second pool users.

To encourage certain groups of users to join Balansea, we will use privacy-prserving ZK proofs (eg. ZKPass) to qualify customers for premium rewards (for eg. based on their country of residence, or online reputation).

To prevent bad actors from claiming free rewards, we will use reputation services (eg. Harpie) to prevent know malicious addresses from accessing funds from any of our pools.

To promote a deeper sense of community, Balansea has disruptive social features. Our first flagship feature is the ability for our premium members to author content and receive a 10% share of the rewards paid to the users that consume their content, but only if the users rate the content as helpful.

To encourage good habit formation and discourage reward farming, Balansea has a once per daily restriction on most rewards. It will also encourage commitment to the practice by rewarding users that have a streaks of N+ days of practice with a bonus reward. It will panalise users who get distracted during their practice (eg. by pausing the meditation session or ending it early) by reducing their rewards. The end goal is to create a community of users that are committed to their practice rather than just the rewards.

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

```bash
npm i -g yarn
yarn install
```

Run a local network in the first terminal:

```bash
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

On a 2nd terminal, start your NextJS app:

```bash
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`
- Edit your frontend in `packages/nextjs/pages`
- Edit your deployment scripts in `packages/hardhat/deploy`

## Deploy smart contracts

[Docs](https://docs.scaffoldeth.io/deploying/deploy-smart-contracts)

### Deploy to the local network

```bash
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

### Deploy random number generator

Follow steps from: <https://docs.chain.link/vrf/v2/subscription/examples/get-a-random-number> on Arbitrum (Sepolia testnet or mainnet, other L2s NOT supported).

### Free Premium membership, based on country verification

Follow steps from: <https://zkpass.gitbook.io/zkpass/developer-guides/schema/custom-schema> on Goerly (testnet, other L2s NOT supported).

### Deployment to testnet

Known testnet chains:

```bash
yarn deploy --network baseSepolia
yarn deploy --network arbitrumSepolia
yarn deploy --network artelaTestnet
yarn deploy --network goerli
```

Supported chains, but without active faucets:

- [XDC Apothem](https://docs.xdc.community/get-started#apothem-testnet)
- [Linea](https://alexastrum.gitbook.io/ethdenver-2024-bounties/linea#bounty-category)

Experimental chains (not supported by WAGMI or Hardhat out-of-box):

- [Hedera](https://alexastrum.gitbook.io/ethdenver-2024-bounties/hedera#winner-breakdown-1)
- [Injective](https://alexastrum.gitbook.io/ethdenver-2024-bounties/injective)
- [Oasis Sapphire](https://docs.oasis.io/dapp/sapphire/)
- [Lukso Universal Profile](https://alexastrum.gitbook.io/ethdenver-2024-bounties/lukso#bounty-category-1)

### Verify smart contracts

```bash
yarn verify --network goerli
```

Other test from the list above networks are NOT supported out-of-box.

### Deployment to mainnet & verify smart contracts

Known mainnet chains:

```bash
yarn deploy --network base
yarn deploy --network arbitrum
```

## Deploy app

[Deploy app](https://docs.scaffoldeth.io/deploying/deploy-nextjs-app)

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

[Disable linter](https://docs.scaffoldeth.io/disable-type-linting-error-checks) if running into issues.

## Contributing

We welcome contributions!

Please see get in touch with us.
