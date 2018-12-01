import {DELETE_PARTNER} from '../constants'
import store from '../../../store'


function partnerDelete(partner) {
  return {
    type: DELETE_PARTNER,
    partner
  }
}

export function deletePartner(partner) {
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
        
        console.log("delete", partner.id);
        
        merchandiseCheckWeb3Instance.deletePartner(partner.id, {from: coinbase})
        .then(()=>dispatch(partnerDelete(partner)))
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
