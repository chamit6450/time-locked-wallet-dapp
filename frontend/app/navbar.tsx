'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import WalletConnector from './WalletConnector';

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-black/30 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
            >
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
              <Link
                href="/components/lock"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Lock ETH
              </Link>
              <Link
                href="/components/status"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Vault Status
              </Link>
              <Link
                href="/components/about"
                className="text-gray-300 hover:text-white transition-colors"
              >
                About
              </Link>
            </motion.div>

            <WalletConnector />
          </div>
        </div>
      </div>
    </nav>
  );
}
