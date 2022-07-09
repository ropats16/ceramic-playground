import { MainContext } from '../context';
import { useState } from 'react';

import { CeramicClient } from '@ceramicnetwork/http-client'
import { DID } from 'dids'
import { getResolver as getKeyResolver } from 'key-did-resolver'
import { getResolver as get3IDResolver } from '@ceramicnetwork/3id-did-resolver'
import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect'

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {

  const [currentAccount, setCurrentAccount] = useState('')

  // const authenticateWithEthereum = async () => {
  //   try {
  //     console.log('Authenticating for ceramic...');

  //     // Create a ThreeIdConnect connect instance as soon as possible in your app to start loading assets
  //     const threeID = new ThreeIdConnect();

  //     const { ethereum } = window;

  //     if (!ethereum) {
  //       alert("Get MetaMask!");
  //       return;
  //     }

  //     const accounts = await ethereum.request({
  //       method: "eth_requestAccounts"
  //     });

  //     console.log("Connected", accounts[0]);
  //     setCurrentAccount(accounts[0]);

  //     // Create an EthereumAuthProvider using the Ethereum provider and requested account
  //     const authProvider = new EthereumAuthProvider(window.ethereum, currentAccount);
  //     // Connect the created EthereumAuthProvider to the 3ID Connect instance so it can be used to
  //     // generate the authentication secret
  //     await threeID.connect(authProvider);

  //     const ceramic = new CeramicClient(ceramicEndpoint);
  //     const did = new DID({
  //       // Get the DID provider from the 3ID Connect instance
  //       provider: threeID.getDidProvider(),
  //       resolver: {
  //         ...get3IDResolver(ceramic),
  //         ...getKeyResolver(),
  //       },
  //     });

  //     // Authenticate the DID using the 3ID provider from 3ID Connect, this will trigger the
  //     // authentication flow using 3ID Connect and the Ethereum provider
  //     await did.authenticate()

  //     // The Ceramic client can create and update streams using the authenticated DID
  //     ceramic.did = did
  //     return ceramic

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const tryAuthenticate = async () => {
  //   if (window.ethereum == null) {
  //     throw new Error('No injected Ethereum provider')
  //   }
  //   return await authenticateWithEthereum(window.ethereum)
  // }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <MainContext.Provider value={{
      currentAccount,
      connectWallet
    }}>
      <Component {...pageProps} />
    </MainContext.Provider>
  )
}

export default MyApp
