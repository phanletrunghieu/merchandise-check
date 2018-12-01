import {GRANT_PRODUCT_TO_PARTNER} from '../constants'
import store from '../../../store'


function productGrantPartner(product, partner, isGrant) {
    return {
        type: GRANT_PRODUCT_TO_PARTNER,
        product,
        partner,
        isGrant
    }
}

export function grantProductPartner(product, partner) {
    let web3 = store.getState().web3.web3Instance
    let merchandiseCheckWeb3Instance = store.getState().web3.merchandiseCheckWeb3Instance
  
    // Double-check web3's status.
    if (typeof web3 !== 'undefined') {
        return function(dispatch) {
            web3.eth.getCoinbase((err, coinbase)=>{
                if(err) {
                    return console.error(err);
                }
                
                merchandiseCheckWeb3Instance.assignProductToPartner(product.id, partner.id, {from: coinbase})
                .then(()=>dispatch(productGrantPartner(product, partner, true)))
            })
        }
    } else {
        console.error('Web3 is not initialized.');
    }
}

export function ungrantProductPartner(product, partner) {
    let web3 = store.getState().web3.web3Instance
    let merchandiseCheckWeb3Instance = store.getState().web3.merchandiseCheckWeb3Instance

    // Double-check web3's status.
    if (typeof web3 !== 'undefined') {
        return function(dispatch) {
            web3.eth.getCoinbase((err, coinbase)=>{
                if(err) {
                    return console.error(err);
                }
                
                merchandiseCheckWeb3Instance.unassignProductToPartner(product.id, partner.id, {from: coinbase})
                .then(()=>dispatch(productGrantPartner(product, partner, false)))
            })
        }
    } else {
        console.error('Web3 is not initialized.');
    }
}