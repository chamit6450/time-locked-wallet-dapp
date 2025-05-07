'use client'
import { useReadContract, useAccount } from "wagmi";
import { formatEther } from 'viem';

const contractABI = [
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_unlockTime',
          type: 'uint256',
        },
      ],
      name: 'lock',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'withdraw',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      stateMutability: 'payable',
      type: 'receive',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
      ],
      name: 'getLockedBalance',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'locked',
      outputs: [
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'unlockTime',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ];

export default function LockedAssets() {
    const {address} = useAccount();
    const {data, isLoading} = useReadContract({
        address: "0x3c7d59a589B989B78Daf2C551Ab90B7Fc4bABFA6",
        abi: contractABI,
        functionName: "getLockedBalance",
        args: [address],
    });

    if(isLoading) {
        return (
            <div className="flex items-center justify-center h-32">
                <div className="loading">Loading vault status...</div>
            </div>
        );
    }

    const balance = data ? formatEther(BigInt(String(data))) : '0';

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-gray-300">Locked Balance</h3>
                    <p className="text-2xl font-bold gradient-text">{balance} ETH</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Status</span>
                    <span className="text-green-400">Active</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Network</span>
                    <span className="text-gray-300">Ethereum Mainnet</span>
                </div>
            </div>
        </div>
    );
}