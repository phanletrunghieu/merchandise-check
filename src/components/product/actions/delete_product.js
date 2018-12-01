import {DELETE_PRODUCT} from '../constants'
import store from '../../../store'


function productDelete(product) {
    return {
        type: DELETE_PRODUCT,
        product
    }
}

export function deleteProduct(product) {
    let web3 = store.getState().web3.web3Instance
    let merchandiseCheckWeb3Instance = store.getState().web3.merchandiseCheckWeb3Instance
  
    // Double-check web3's status.
    if (typeof web3 !== 'undefined') {
        return function(dispatch) {
            web3.eth.getCoinbase((err, coinbase)=>{
                if(err) {
                    return console.error(err);
                }
                
                merchandiseCheckWeb3Instance.deleteProduct(product.id, {from: coinbase})
                .then(()=>dispatch(productDelete(product)))
            })
        }
    } else {
        console.error('Web3 is not initialized.');
    }
  }
  