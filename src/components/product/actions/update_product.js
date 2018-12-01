import {UPDATE_PRODUCT} from '../constants'
import store from '../../../store'


function productUpdate(product) {
    return {
        type: UPDATE_PRODUCT,
        product
    }
}

export function updateProduct(product) {
    let web3 = store.getState().web3.web3Instance
    let merchandiseCheckWeb3Instance = store.getState().web3.merchandiseCheckWeb3Instance
  
    // Double-check web3's status.
    if (typeof web3 !== 'undefined') {
        return function(dispatch) {
            web3.eth.getCoinbase((err, coinbase)=>{
                if(err) {
                    return console.error(err);
                }
                
                console.log(product);
                
                merchandiseCheckWeb3Instance.updateProduct(product.id, product.name, product.description, product.image, {from: coinbase})
                .then(()=>dispatch(productUpdate(product)))
            })
        }
    } else {
        console.error('Web3 is not initialized.');
    }
  }
  