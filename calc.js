const walletAddressElement = document.getElementById('walletAddress');
        const statusMessageElement = document.getElementById('statusMessage');
        const resultElement = document.getElementById('result');
        let accounts = [];

        // Contract ABI and Address (replace with your deployed contract's ABI and address)
        const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "num1",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "num2",
				"type": "uint256"
			}
		],
		"name": "add",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "num1",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "num2",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "result",
				"type": "uint256"
			}
		],
		"name": "Addition",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "num1",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "num2",
				"type": "uint256"
			}
		],
		"name": "subtract",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "num1",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "num2",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "result",
				"type": "uint256"
			}
		],
		"name": "Subtraction",
		"type": "event"
	}
];
        const contractAddress = '0xc6359D6Eb37DBaC510d090B7c7AF583b0877E804'; // Replace with your deployed contract address

        // Web3 instance and contract
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        async function connectWallet() {
            if (typeof window.ethereum !== 'undefined') {
                try {
                    // Request account access if needed
                    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                    walletAddressElement.textContent = `Connected Wallet Address: ${accounts[0]}`;
                } catch (error) {
                    console.error('User denied account access:', error);
                    walletAddressElement.textContent = 'Connection failed';
                }
            } else {
                walletAddressElement.textContent = 'MetaMask not installed';
            }
        }

        async function add() {
            const num1 = parseFloat(document.getElementById('num1').value);
            const num2 = parseFloat(document.getElementById('num2').value);

            try {
                const result = await contract.methods.add(num1, num2).send({ from: accounts[0] });
                statusMessageElement.textContent = `Transaction hash: ${result.transactionHash}`;
                const resultValue = await contract.methods.add(num1, num2).call();
                resultElement.textContent = resultValue;
            } catch (error) {
                statusMessageElement.textContent = `Error: ${error.message}`;
                console.error('Error:', error);
            }
        }

        async function subtract() {
            const num1 = parseFloat(document.getElementById('num1').value);
            const num2 = parseFloat(document.getElementById('num2').value);

            try {
                const result = await contract.methods.subtract(num1, num2).send({ from: accounts[0] });
                statusMessageElement.textContent = `Transaction hash: ${result.transactionHash}`;
                const resultValue = await contract.methods.subtract(num1, num2).call();
                resultElement.textContent = resultValue;
            } catch (error) {
                statusMessageElement.textContent = `Error: ${error.message}`;
                console.error('Error:', error);
            }
        }

        window.addEventListener('load', async () => {
            // Check if MetaMask is installed
            if (typeof window.ethereum !== 'undefined') {
                // Check if already connected to MetaMask
                accounts = await ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    walletAddressElement.textContent = `Connected Wallet Address: ${accounts[0]}`;
                }
            } else {
                walletAddressElement.textContent = 'MetaMask not installed';
            }
        });