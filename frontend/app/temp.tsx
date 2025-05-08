'use client';

import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Link from 'next/link';
import WalletConnector from './WalletConnector';



function home() {
  return (
    <div className="min-h-screen relative text-white overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img src="/grid-bg.png" alt="Grid Background" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-black/80" />
      </div>
      {/* Navbar */}
      <nav className="fixed w-full bg-black/30 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                LockVault
              </Link>
            </motion.div>
            <div className="flex items-center space-x-8">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="hidden md:flex space-x-6"
              >
                <Link href="/components/lock" className="text-gray-300 hover:text-white transition-colors">Lock ETH</Link>
                <Link href="/components/status" className="text-gray-300 hover:text-white transition-colors">Vault Status</Link>
                <Link href="/components/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
              </motion.div>
              <WalletConnector />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
            >
              Secure Your Digital Assets
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
            >
              Lock your ETH securely with our advanced time-lock vault system. Set your desired lock period and rest assured your assets are protected.
            </motion.p>
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          >
            <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Time-Locked Security</h3>
              <p className="text-gray-300">Set custom lock periods for your ETH, ensuring your assets remain secure until your specified time.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4 text-purple-400">Smart Contract Backed</h3>
              <p className="text-gray-300">Built on Ethereum's secure blockchain, your assets are protected by immutable smart contracts.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4 text-green-400">Easy Withdrawal</h3>
              <p className="text-gray-300">Once the lock period ends, withdraw your assets with just a few clicks.</p>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-16"
          >
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Start Locking Your ETH
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}





