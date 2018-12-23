import {CREATE_NEW_PARTNER,FETCH_LIST_PARTNERS} from '../constants'
import store from '../../../store'


function partnerList(partners) {
    return {
        type: FETCH_LIST_PARTNERS,
        partners
    }
}

export function listPartner() {
    let web3 = store.getState().web3.web3Instance
    let merchandiseCheckEtherInstance = store.getState().web3.merchandiseCheckEtherInstance

    // Double-check web3's status.
    if (typeof web3 !== 'undefined') {
        return function(dispatch) {
            web3.eth.getCoinbase((err, coinbase)=>{
                if(err) {
                  return console.error(err);
                }

                merchandiseCheckEtherInstance.getSupplier(coinbase)
                .then(supplier=>{
                    let listPromise = []

                    for (let i = 1; i < supplier.partnerIds.length; i++) {
                        const partnerId = supplier.partnerIds[i];
                        listPromise.push(merchandiseCheckEtherInstance.getPartner(partnerId))
                    }

                    return Promise.all(listPromise)
                })
                // merchandiseCheckEtherInstance.getPartnersBySupplier(coinbase)
                .then(partners=>{
                    console.log("list partners", partners);
                    
                    dispatch(partnerList(partners))
                })
                .catch(err=>{
                    console.error(err.reason[0]);
                })
            })
        }
    } else {
        console.error('Web3 is not initialized.');
    }
}
