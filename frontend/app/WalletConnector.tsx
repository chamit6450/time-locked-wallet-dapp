'use client';
import { useState } from 'react';
import { useConnect, useAccount, useDisconnect, useBalance } from 'wagmi';

export default function WalletConnector() {
  const { connectors, connect } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [open, setOpen] = useState(false);

  const { data: balance, isLoading } = useBalance({
    address,
  });

  const toggleDropdown = () => setOpen(!open);

  if (isConnected) {
    return (
      <div className="flex items-center gap-4 bg-gray-900/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-800">
        <div className="text-sm text-right">
          <p className="text-gray-200">{balance?.formatted.slice(0, 6)} {balance?.symbol}</p>
          <p className="text-xs text-gray-400">{address?.slice(0, 6)}...{address?.slice(-4)}</p>
        </div>
        <button
          onClick={() => disconnect()}
          className="px-4 py-2 text-sm font-semibold text-white bg-red-600/80 rounded hover:bg-red-700 transition"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="connect-wallet-btn"
      >
        Connect Wallet
      </button>

      {open && (
        <div className="absolute left-0 right-0 mt-2 w-full rounded-lg shadow-lg bg-gray-900/95 z-10 overflow-hidden">
          <div className="py-1">
            {connectors.map((connector) => (
              <button
                key={connector.id}
                onClick={() => {
                  connect({ connector });
                  setOpen(false);
                }}
                className="w-full px-4 py-3 text-sm text-gray-200 text-left flex items-center gap-2 bg-black hover:bg-gray-800 transition"

              >
                <span className="w-2 h-2 "></span>
                {connector.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}