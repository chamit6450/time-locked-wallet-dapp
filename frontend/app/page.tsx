'use client';

import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Timelock from "./Timelock";
import WalletConnector from './WalletConnector';
import LockedAssets from './LockedAssets';
import Link from 'next/link';

const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http("https://eth-sepolia.g.alchemy.com/v2/moo1kSKljvytnlZewNBllrNgfLMszFsZ")
  }
});

const queryClient = new QueryClient();

function AppContent() {
  return (
    <div className="min-h-screen">
      <nav className="navbar">
        <div className="navbar-content">
          <Link href="/" className="text-2xl font-bold gradient-text">LockVault</Link>
          <div className="nav-links">
            <Link href="/lock" className="nav-link">Lock ETH</Link>
            <Link href="/status" className="nav-link">Vault Status</Link>
            <Link href="/about" className="nav-link">About</Link>
            <WalletConnector />
          </div>
        </div>
      </nav>

      <main className="main-content">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card ">
            <h1 className="gradient-text text-4xl mb-6">Secure Your ETH</h1>
            <p className="text-gray-300 mb-6">
              Lock your ETH securely with our advanced time-lock vault system.
              Set your desired lock period and rest assured your assets are safe.
            </p>
            <Timelock />
          </div>
          <div className="card ">
            <h2 className="gradient-text text-2xl mb-6">Vault Status</h2>
            <LockedAssets />
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </WagmiProvider>
  );
}


