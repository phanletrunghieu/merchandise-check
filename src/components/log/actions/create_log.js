import {CREATE_NEW_LOG,FETCH_LIST_LOGS} from '../constants'
import store from '../../../store'
const uuidv4 = require('uuid/v4');

function logCreatedNew(log) {
  return {
    type: CREATE_NEW_LOG,
    log
  }
}

export function createdNewLog(log, productID) {
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

        log.id = uuidv4().split("-").join("")
        
        merchandiseCheckWeb3Instance.createLog(log.id, productID, log.description, log.video, {from: coinbase})
        .then(()=>{
          log.id = web3.fromUtf8(log.id)
          log.productId = productID
          dispatch(logCreatedNew(log))
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
