import {UPDATE_PARTNER} from '../constants'
import store from '../../../store'


function partnerUpdate(partner) {
    return {
        type: UPDATE_PARTNER,
        partner
    }
}

export function updatePartner(partner) {
    let web3 = store.getState().web3.web3Instance
    let merchandiseCheckWeb3Instance = store.getState().web3.merchandiseCheckWeb3Instance
  
    // Double-check web3's status.
    if (typeof web3 !== 'undefined') {
        return function(dispatch) {
            web3.eth.getCoinbase((err, coinbase)=>{
                if(err) {
                    return console.error(err);
                }
                
                merchandiseCheckWeb3Instance.updatePartner(partner.id, partner.name, {from: coinbase})
                .then(()=>dispatch(partnerUpdate(partner)))
            })
        }
    } else {
        console.error('Web3 is not initialized.');
    }
  }
  