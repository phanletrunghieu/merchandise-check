import {CREATE_NEW_PRODUCT} from '../constants'
import store from '../../../store'
const uuidv4 = require('uuid/v4');

function productCreatedNew(product) {
  return {
    type: CREATE_NEW_PRODUCT,
    product
  }
}

export function createdNewProduct(product) {
  let web3 = store.getState().web3.web3Instance
  let merchandiseCheckWeb3Instance = store.getState().web3.merchandiseCheckWeb3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {
    return function(dispatch) {
      web3.eth.getCoinbase((err, coinbase)=>{
        if(err) {
          return console.error(err);
        }

        product.id = uuidv4().split("-").join("")
        
        merchandiseCheckWeb3Instance.createProduct(product.id, product.name, product.description, product.image, {from: coinbase})
        .then(()=>{
          product.id = web3.fromUtf8(product.id)
          dispatch(productCreatedNew(product))
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
