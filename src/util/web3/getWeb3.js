import store from '../../store'
import Web3 from 'web3'
import { ethers } from 'ethers';
import MerchandiseCheck from '../../../build/contracts/MerchandiseCheck.json'
const contract = require('truffle-contract')

export const WEB3_INITIALIZED = 'WEB3_INITIALIZED'
function web3Initialized(results) {
  return {
    type: WEB3_INITIALIZED,
    payload: results
  }
}

let getWeb3 = new Promise(function(resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', function(dispatch) {
    var results
    var web3 = window.web3

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      web3 = new Web3(web3.currentProvider)
      console.log('Injected web3 detected.');
    } else {
      // Fallback to localhost if no web3 injection. We've configured this to
      // use the development console's port by default.
      var provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545')
      web3 = new Web3(provider)
      alert('No web3 instance injected, using Local web3. Recommend: Metamask')
    }

    const merchandiseCheckWeb3Instance = contract(MerchandiseCheck)
    merchandiseCheckWeb3Instance.setProvider(web3.currentProvider)

    merchandiseCheckWeb3Instance.deployed()
    .then(instance=>{
      let etherProvider = new ethers.providers.Web3Provider(web3.currentProvider);
      let merchandiseCheckEtherInstance = new ethers.Contract(instance.address, instance.abi, etherProvider);

      results = {
        web3Instance: web3,
        merchandiseCheckWeb3Instance: instance,
        merchandiseCheckEtherInstance,
      }

      store.dispatch(web3Initialized(results))
      resolve(results)
    })
  })
})

export default getWeb3
