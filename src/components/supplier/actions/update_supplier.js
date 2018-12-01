import {UPDATE_SUPPLIER} from '../constants'
import store from '../../../store'


function supplierUpdate(supplier) {
    return {
        type: UPDATE_SUPPLIER,
        supplier
    }
}

export function updateSupplier(supplier) {
    let web3 = store.getState().web3.web3Instance
    let merchandiseCheckWeb3Instance = store.getState().web3.merchandiseCheckWeb3Instance
  
    // Double-check web3's status.
    if (typeof web3 !== 'undefined') {
        return function(dispatch) {
            web3.eth.getCoinbase((err, coinbase)=>{
                if(err) {
                    return console.error(err);
                }
                
                merchandiseCheckWeb3Instance.updateSupplier(supplier.addr, supplier.name, {from: coinbase})
                .then(()=>dispatch(supplierUpdate(supplier)))
            })
        }
    } else {
        console.error('Web3 is not initialized.');
    }
  }
  