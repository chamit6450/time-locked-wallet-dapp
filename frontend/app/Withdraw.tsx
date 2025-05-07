// import { useAccount, useWriteContract } from "wagmi";
// const contractABI = [
//     {
//       inputs: [
//         {
//           internalType: 'uint256',
//           name: '_unlockTime',
//           type: 'uint256',
//         },
//       ],
//       name: 'lock',
//       outputs: [],
//       stateMutability: 'payable',
//       type: 'function',
//     },
//     {
//       inputs: [],
//       name: 'withdraw',
//       outputs: [],
//       stateMutability: 'nonpayable',
//       type: 'function',
//     },
//     {
//       stateMutability: 'payable',
//       type: 'receive',
//     },
//     {
//       inputs: [
//         {
//           internalType: 'address',
//           name: 'user',
//           type: 'address',
//         },
//       ],
//       name: 'getLockedBalance',
//       outputs: [
//         {
//           internalType: 'uint256',
//           name: '',
//           type: 'uint256',
//         },
//       ],
//       stateMutability: 'view',
//       type: 'function',
//     },
//     {
//       inputs: [
//         {
//           internalType: 'address',
//           name: '',
//           type: 'address',
//         },
//       ],
//       name: 'locked',
//       outputs: [
//         {
//           internalType: 'uint256',
//           name: 'amount',
//           type: 'uint256',
//         },
//         {
//           internalType: 'uint256',
//           name: 'unlockTime',
//           type: 'uint256',
//         },
//       ],
//       stateMutability: 'view',
//       type: 'function',
//     },
//   ];
// export default function Withdraw() {
//     const {address} = useAccount();

//     const {data: hash, writeContract} = useWriteContract({
//         address: 0x3c7d59a589B989B78Daf2C551Ab90B7Fc4bABFA6,
//         abi:ContractABI,

//     })
// }