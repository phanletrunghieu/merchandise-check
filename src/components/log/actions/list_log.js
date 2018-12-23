import {CREATE_NEW_LOG,FETCH_LIST_LOGS} from '../constants'
import store from '../../../store'


function logList(logs) {
    return {
        type: FETCH_LIST_LOGS,
        logs
    }
}

export function listLog(productID) {
    let web3 = store.getState().web3.web3Instance
    let merchandiseCheckEtherInstance = store.getState().web3.merchandiseCheckEtherInstance

    // Double-check web3's status.
    if (typeof web3 !== 'undefined') {
        return function(dispatch) {
            merchandiseCheckEtherInstance.getProduct(productID)
            .then(product=>{
                let listPromise = []

                for (let i = 1; i < product.logIds.length; i++) {
                    const logId = product.logIds[i];
                    listPromise.push(merchandiseCheckEtherInstance.getLog(logId))
                }

                return Promise.all(listPromise)
            })
            // merchandiseCheckEtherInstance.getLogsByProduct(productID)
            .then(logs=>{
                dispatch(logList(logs))
            })
            .catch(err=>{
                console.error(err.reason[0]);
            })
        }
    } else {
        console.error('Web3 is not initialized.');
    }
}
