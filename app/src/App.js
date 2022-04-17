import React, { useEffect, useState } from "react";
import "./App.css";
import twitterLogo from "./assets/twitter-logo.svg";
import CandyMachine from './CandyMachine';

// Constants
const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const [walletAddress, setWalletAddrtess] = useState(null);

  const connectWallet = async () => {
    try {
      const { solana } = window;
      if (solana) {
        const response = await solana.connect();
        console.log("connected to public key", response.publicKey.toString());
        setWalletAddrtess(response.publicKey.toString());
      } else {
        console.log("Solana object not found try using phantom");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana && solana.isPhantom) {
        console.log("phantom wallet detected");

        const response = await solana.connect({ onlyIfTrusted: true });
        console.log("connected with public key", response.publicKey.toString());

        setWalletAddrtess(response.publicKey.toString());
      } else {
        console.log("Solana object not found try using phantom");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const renderNotConnectedContainer = () => {
    return ( <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button> );
  };
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <div className="App">
    <div className="container">
      <div className="header-container">
        <p className="header">🍭 Candy Drop</p>
        <p className="sub-text">NFT drop machine with fair mint</p>
        {!walletAddress && renderNotConnectedContainer()}
      </div>
      {/* Check for walletAddress and then pass in walletAddress */}
    {walletAddress && <CandyMachine walletAddress={window.solana} />}
      <div className="footer-container">
        <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
        <a
          className="footer-text"
          href={TWITTER_LINK}
          target="_blank"
          rel="noreferrer"
        >{`built on @${TWITTER_HANDLE}`}</a>
      </div>
    </div>
  </div>
  );
};

export default App;
