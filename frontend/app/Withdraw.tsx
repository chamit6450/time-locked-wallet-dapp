import { useAccount, useWriteContract } from "wagmi";
import { useState } from "react";

const contractABI = [
  {
    inputs: [{ internalType: 'uint256', name: '_unlockTime', type: 'uint256' }],
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
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'getLockedBalance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'locked',
    outputs: [
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint256', name: 'unlockTime', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export default function Withdraw() {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { data: hash, writeContract } = useWriteContract();

  async function Submit() {
    setError('');
    setLoading(true);
    try {
      writeContract({
        abi: contractABI,
        address: '0x3c7d59a589b989b78daf2c551ab90b7fc4babfa6',
        functionName: 'withdraw', 
      });
    } catch (err) {
      console.error("Error withdrawing ETH:", err);
      setError('Failed to withdraw ETH. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        className="w-1/4 bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] text-white border-none rounded-lg px-6 py-3 mt-8 font-semibold cursor-pointer transition-transform duration-200 ease-in-out hover:-translate-y-0.5"
        onClick={Submit}
        disabled={loading}
      >
        {loading ? 'Withdrawing...' : 'Withdraw'}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {hash && <p className="text-green-500 mt-2">Transaction Hash: {hash}</p>}
    </>
  );
}
