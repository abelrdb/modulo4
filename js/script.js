import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js";

let provider, signer, address, contract;

const contractAddress = "0xdabd9b7009e46a17dea91c0ae6b484695fcb4df2"; 
const contractAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenA",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_tokenB",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "provider",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountA",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountB",
				"type": "uint256"
			}
		],
		"name": "LiquidityAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "provider",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountA",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountB",
				"type": "uint256"
			}
		],
		"name": "LiquidityRemoved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "tokenIn",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountIn",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "tokenOut",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountOut",
				"type": "uint256"
			}
		],
		"name": "TokensSwapped",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountA",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountB",
				"type": "uint256"
			}
		],
		"name": "addLiquidity",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			}
		],
		"name": "getPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "poolA",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "poolB",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountA",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountB",
				"type": "uint256"
			}
		],
		"name": "removeLiquidity",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountAIn",
				"type": "uint256"
			}
		],
		"name": "swapAforB",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountBIn",
				"type": "uint256"
			}
		],
		"name": "swapBforA",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenA",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenB",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]



async function connectWallet() {
  

  if(window.ethereum) {
    alert('Metamask detected');

    await window.ethereum.request({ method: 'eth_requestAccounts' });
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();

    address = await signer.getAddress();

    contract = new ethers.Contract(contractAddress, contractAbi, signer);

    document.getElementById('btnConnect').style.display = 'none';
    document.getElementById('btnDisconnect').style.display = 'inline';
	document.getElementById('status').innerText = `Estado: Conectado a la cuenta ${address}`;
    document.getElementById('agregarLiq').style.display = 'block';
    document.getElementById('quitarLiq').style.display = 'block';
    document.getElementById('swapAforB').style.display = 'block';
    document.getElementById('swapBforA').style.display = 'block';
	document.getElementById('getPriceToken').style.display = 'block';
	}

  else {
    alert('Metamask not detected');
  }
}



async function disconnectWallet() {
  provider = null;
  signer = null;
  address = null;

  document.getElementById('status').innerText = "Estado: Desconectado";
  document.getElementById('btnConnect').style.display = 'inline';
  document.getElementById('btnDisconnect').style.display = 'none'; 
  document.getElementById('agregarLiq').style.display = 'none'; 
  document.getElementById('quitarLiq').style.display = 'none';
  document.getElementById('swapAforB').style.display = 'none'; 
  document.getElementById('swapBforA').style.display = 'none'; 
  document.getElementById('getPriceToken').style.display = 'none'; 
}



async function agregarLiquidez() {

  const tA = document.getElementById('tokenA').value;
  const tB = document.getElementById('tokenB').value;

  if(isNaN(tA) || tA <= 0) {
    alert('Monto inválido');
    return;
  }

  if(isNaN(tB) || tB <= 0) {
    alert('Monto inválido');
    return;
  }

    const tx = await contract.addLiquidity(tA, tB);
    await tx.wait();
}




async function quitarLiquidez() {

  const tA = document.getElementById('tokenAquitar').value;
  const tB = document.getElementById('tokenBquitar').value;

  if (isNaN(tA) || tA <= 0) {
    alert("Monto inválido.");
    return;
  }

  if (isNaN(tB) || tB <= 0) {
    alert("Monto inválido.");
    return;
  }
  
  const tx = await contract.removeLiquidity(tA, tB);
  await tx.wait();
}




async function swapA() {

const tA = document.getElementById('swapTokenA').value;
 

if (isNaN(tA) || tA <= 0) {
    alert("Monto inválido.");
    return;
  }

// el approve ya esta implementado dentro de la funcion swapAforB del SimpleDEX
const tx = await contract.swapAforB(tA);
await tx.wait();
}



async function swapB() {

const tB = document.getElementById('swapTokenB').value;
 
if (isNaN(tB) || tB <= 0) {
    alert("Monto inválido.");
    return;
}

// el approve ya esta implementado dentro de la funcion swapBforA del SimpleDEX
const tx = await contract.swapBforA(tB);
await tx.wait();
}



async function priceToken() {

const t = document.getElementById('getPrices').value;

if (t !== 'tokenA' && t !== 'tokenB') {
    alert('Nombre de token invalido');
    return
}
  
const p = await contract.getPrice(t);
alert(`El precio es: ${p}`);  
}


document.getElementById('btnConnect').addEventListener('click', connectWallet);
document.getElementById('btnDisconnect').addEventListener('click', disconnectWallet);
document.getElementById('btnAgregarLiq').addEventListener('click', agregarLiquidez);
document.getElementById('btnQuitarLiq').addEventListener('click', quitarLiquidez);
document.getElementById('btnSwapTokenA').addEventListener('click', swapA);
document.getElementById('btnSwapTokenB').addEventListener('click', swapB);
document.getElementById('btnPrice').addEventListener('click', priceToken);


