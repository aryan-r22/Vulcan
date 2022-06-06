
function confirmEtherTransaction(txHash, confirmations = 10) {
    setTimeout(async () => {
      
      // Get current number of confirmations and compare it with sought-for value
      const trxConfirmations = await getConfirmations(txHash)
      
      console.log('Transaction with hash ' + txHash + ' has ' + trxConfirmations + ' confirmation(s)')
  
      if (trxConfirmations >= confirmations) {
        // Handle confirmation event according to your business logic
        
        console.log('Transaction with hash ' + txHash + ' has been successfully confirmed')
  
        return
      }
      // Recursive call
      return confirmEtherTransaction(txHash, confirmations)
    }, 30 * 1000)
  }