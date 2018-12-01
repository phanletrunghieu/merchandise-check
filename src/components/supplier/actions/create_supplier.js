import {CREATE_NEW_SUPPLIER,FETCH_LIST_SUPPLIERS} from '../constants'
import store from '../../../store'


function supplierCreatedNew(supplier) {
  return {
    type: CREATE_NEW_SUPPLIER,
    supplier
  }
}

export function createdNewSupplier(supplier) {
  let web3 = store.getState().web3.web3Instance
  let merchandiseCheckEtherInstance = store.getState().web3.merchandiseCheckEtherInstance
  let merchandiseCheckWeb3Instance = store.getState().web3.merchandiseCheckWeb3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {
    return function(dispatch) {
      // Get current ethereum wallet.
      web3.eth.getCoinbase((err, coinbase)=>{
        if(err) {
          return console.error(err);
        }
        console.log(supplier);
        
        merchandiseCheckWeb3Instance.createSupplier(supplier.address, supplier.name, {from: coinbase})
        .then(()=>dispatch(supplierCreatedNew(supplier)))
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
