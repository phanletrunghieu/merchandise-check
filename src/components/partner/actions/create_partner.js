import {CREATE_NEW_PARTNER,FETCH_LIST_PARTNERS} from '../constants'
import store from '../../../store'
const uuidv4 = require('uuid/v4');

function partnerCreatedNew(partner) {
  return {
    type: CREATE_NEW_PARTNER,
    partner
  }
}

export function createdNewPartner(partner) {
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
        merchandiseCheckWeb3Instance.createPartner(partner.address, partner.name, {from: coinbase})
        .then(()=>{
          console.log("address", partner.address);
          partner.id = partner.address + "000000000000000000000000";
          console.log("id", partner.id);
          dispatch(partnerCreatedNew(partner))
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
