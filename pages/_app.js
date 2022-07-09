import { MainContext } from '../context';
import { useState } from 'react';

import { CeramicClient } from '@ceramicnetwork/http-client'
import { DID } from 'dids'
import { getResolver as get3IDResolver } from '@ceramicnetwork/3id-did-resolver'
import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect'

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {

  const [currentAccount, setCurrentAccount] = useState('')

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
