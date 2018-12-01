import {FETCH_LIST_PRODUCTS, FETCH_LIST_PRODUCTS_BY_PARTNER} from '../constants'
import store from '../../../store'
import { resolve } from 'url';
import { rejects } from 'assert';


function productList(products) {
    return {
        type: FETCH_LIST_PRODUCTS,
        products
    }
}

function productListByPartner(products) {
    return {
        type: FETCH_LIST_PRODUCTS_BY_PARTNER,
        products
    }
}

export function listProductByPartner(partnerAddress) {
    let web3 = store.getState().web3.web3Instance
    let merchandiseCheckEtherInstance = store.getState().web3.merchandiseCheckEtherInstance

    // Double-check web3's status.
    if (typeof web3 !== 'undefined') {
        return function(dispatch) {
            let p;
            if (!partnerAddress) {
                p = new Promise((resolve, reject)=>{
                    web3.eth.getCoinbase((err, coinbase)=>{
                        if(err) {
                          return reject(err);
                        }
                        resolve(coinbase)
                    })
                })
            } else {
                p = new Promise(resolve=>resolve(partnerAddress))
            }

            p.then(partAddr=>merchandiseCheckEtherInstance.getProductsByPartner(partAddr+"000000000000000000000000"))
            .then(products=>{
                console.log("partner's products", products);
                dispatch(productListByPartner(products))
            })
            .catch(err=>{
                console.error(err);
            })
        }
    } else {
        console.error('Web3 is not initialized.');
    }
}

export function listProduct() {
    let web3 = store.getState().web3.web3Instance
    let merchandiseCheckEtherInstance = store.getState().web3.merchandiseCheckEtherInstance

    // Double-check web3's status.
    if (typeof web3 !== 'undefined') {
        return function(dispatch) {
            web3.eth.getCoinbase((err, coinbase)=>{
                if(err) {
                  return console.error(err);
                }

                console.log("list product of supplier", coinbase);
                merchandiseCheckEtherInstance.getProductsBySupplier(coinbase)
                .then(products=>{
                    console.log("list product", products);
                    
                    dispatch(productList(products))
                })
                .catch(err=>{
                    console.error(err);
                })
            })
        }
    } else {
        console.error('Web3 is not initialized.');
    }
}