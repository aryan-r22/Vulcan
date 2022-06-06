import React from 'react';
import logo from './logo.svg';
import './App.css';

// TypeScript
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import Web3 from 'web3'

const APP_NAME = 'Test_App'
const APP_LOGO_URL = 'https://example.com/logo.png'
const DEFAULT_ETH_JSONRPC_URL = 'https://polygon-mumbai.g.alchemy.com/v2/12WquzaYH88Y_89RPueGApsIkjpvMLaX'
const DEFAULT_CHAIN_ID = 1

// Initialize Coinbase Wallet SDK
export const coinbaseWallet = new CoinbaseWalletSDK({
  appName: APP_NAME,
  appLogoUrl: APP_LOGO_URL,
  darkMode: false
})

// Initialize a Web3 Provider object
export const ethereum = coinbaseWallet.makeWeb3Provider(DEFAULT_ETH_JSONRPC_URL, DEFAULT_CHAIN_ID)

// Initialize a Web3 object
export const web3 = new Web3(ethereum as any)



// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
