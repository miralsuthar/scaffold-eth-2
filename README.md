# Scaffold-Eth 2 - External Contract UI

## Purpose:

This function helps builders easily connect with and use smart contracts that were created outside their own projects. It's especially useful when one contract creates another contract but doesn't have a simple way to use it. This makes working with different contracts simpler and more efficient.


## How to use:

- [x] First click on `+` button to open a modal of External Contract UI
<img width="1624" alt="Screenshot 2023-12-20 at 4 55 59 PM" src="https://github.com/miralsuthar/scaffold-eth-2/assets/57826091/0b02edfe-7fb3-47c0-a9fe-ae0212c8c985">

- [x] Then fill up the infos, like:
- Name: `name of the external contract`
- Address: `A contract address that you want to interact with`
- Contract: `Select from the pre deploy contract whose ABI is better match with your contract address`
  
<img width="1624" alt="Screenshot 2023-12-20 at 4 56 29 PM" src="https://github.com/miralsuthar/scaffold-eth-2/assets/57826091/24c00c55-15d2-4210-8924-e79a38ca44c4">

- [x] After clicking create, you can see on your debug page there is a UI created for your external contract address
<img width="1624" alt="Screenshot 2023-12-20 at 4 56 43 PM" src="https://github.com/miralsuthar/scaffold-eth-2/assets/57826091/452eac6c-a720-48f7-aa33-10cb62dbb85b">

# 🏃‍♀️ Fork the code

required: [Node](https://nodejs.org/dist/latest-v12.x/) plus [Yarn](https://classic.yarnpkg.com/en/docs/install/) and [Git](https://git-scm.com/downloads)


```bash
git clone https://github.com/miralsuthar/scaffold-eth-2.git

cd scaffold-eth-2

git checkout external-contract-ui
```

```bash

yarn install

```

```bash

yarn start

```

> in a second terminal window:

```bash
cd scaffold-eth-2
yarn chain

```

📝 Edit your frontend `App.jsx` in `packages/react-app/src`

📱 Open http://localhost:3000 to see the app
