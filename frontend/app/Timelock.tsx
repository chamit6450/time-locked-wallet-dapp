'use client';

import * as React from 'react';
import {useState} from 'react';
import { useWriteContract } from 'wagmi';
import { parseEther } from 'viem';

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
export default function Timelock() {
    const { data: hash, writeContract } = useWriteContract();
    const [amt, setAmt] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
  
    const getUnixFromDateTime = (dateStr: string, timeStr: string) => {
      const dateTimeUTC = new Date(`${dateStr}T${timeStr}:00Z`);
      const istOffsetMinutes = 330; 
      const istTime = new Date(dateTimeUTC.getTime() + istOffsetMinutes * 60 * 1000);
      return Math.floor(istTime.getTime() / 1000);
    };
  
    async function submit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setError('');
      
      if (!date || !time || !amt) {
        setError('Please fill in all fields');
        return;
      }

      if (isNaN(Number(amt)) || Number(amt) <= 0) {
        setError('Please enter a valid amount');
        return;
      }
  
      const unixTime = getUnixFromDateTime(date, time);
      const ethValue = parseEther(amt);
  
      setIsLoading(true);
      try {
        writeContract({
          abi: contractABI,
          address: '0x3c7d59a589b989b78daf2c551ab90b7fc4babfa6',
          functionName: 'lock',
          args: [unixTime],
          value: ethValue,
        });
      } catch (error) {
        console.error("Error locking ETH:", error);
        setError('Failed to lock ETH. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  
    return (
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Amount (ETH)</label>
          <input
            type="text"
            placeholder="0.0"
            value={amt}
            onChange={(e) => setAmt(e.target.value)}
            className="input"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Unlock Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-300">Unlock Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="input"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] text-white border-none rounded-lg px-6 py-3 font-semibold cursor-pointer transition-transform duration-200 ease-in-out hover:-translate-y-0.5 "

          disabled={isLoading}
        >
          {isLoading ? 'Locking...' : 'Lock ETH'}
        </button>

        {error && <p className="error">{error}</p>}
        {hash && <p className="success">Transaction Hash: {hash}</p>}
      </form>
    );
  }