import {DELETE_SUPPLIER} from '../constants'
import store from '../../../store'


function supplierDelete(supplier) {
  return {
    type: DELETE_SUPPLIER,
    supplier
  }
}

export function deleteSupplier(supplier) {
  let web3 = store.getState().web3.web3Instance
  let merchandiseCheckWeb3Instance = store.getState().web3.merchandiseCheckWeb3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {
    return function(dispatch) {
      // Get current ethereum wallet.
      web3.eth.getCoinbase((err, coinbase)=>{
        if(err) {
          return console.error(err);
        }
        
        merchandiseCheckWeb3Instance.deleteSupplier(supplier.addr, {from: coinbase})
        .then(()=>dispatch(supplierDelete(supplier)))
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
