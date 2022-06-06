
function watchTokenTransfers() {
    // Instantiate web3 with WebSocketProvider
    const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws'))
  
    // Instantiate token contract object with JSON ABI and address
    const tokenContract = new web3.eth.Contract(
      TOKEN_ABI, process.env.TOKEN_CONTRACT_ADDRESS,
      (error, result) => { if (error) console.log(error) }
    )
  
    // Generate filter options
    const options = {
      filter: {
        _from:  process.env.WALLET_FROM,
        _to:    process.env.WALLET_TO,
        _value: process.env.AMOUNT
      },
      fromBlock: 'latest'
    }
  
    // Subscribe to Transfer events matching filter criteria
    tokenContract.events.Transfer(options, async (error, event) => {
      if (error) {
        console.log(error)
        return
      }
  
      console.log('Found incoming Pluton transaction from ' + process.env.WALLET_FROM + ' to ' + process.env.WALLET_TO + '\n');
      console.log('Transaction value is: ' + process.env.AMOUNT)
      console.log('Transaction hash is: ' + txHash + '\n')
  
      // Initiate transaction confirmation
      confirmEtherTransaction(event.transactionHash)
  
      return
    })
  }