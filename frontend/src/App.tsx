import "./App.css";
import Main from "./layouts/Main";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, createClient, WagmiConfig, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import "@rainbow-me/rainbowkit/styles.css";
import Loader from "./components/Loader";
import LoadingContext from "./contexts/LoadingContext";
import { useState } from "react";

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.polygonMumbai, chain.goerli, chain.rinkeby],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Vulcan",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function App() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="App">
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <LoadingContext.Provider value={{ loading, setLoading }}>
            <Loader loading={loading} />
            <Main />
          </LoadingContext.Provider>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default App;
