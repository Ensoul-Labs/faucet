import { WagmiConfig, createClient, configureChains } from "wagmi"
import { mainnet, polygon } from '@wagmi/chains';
import '../styles/globals.css'
import Home from ".";
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

export const { chains, provider } = configureChains(
  // [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [polygon],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
})

function MyApp() {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
        <Home />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp