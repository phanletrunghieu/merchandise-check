import { browserHistory } from 'react-router'
import store from '../../../store'

export const USER_LOGGED_IN = 'USER_LOGGED_IN'
function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}

export function loginUser() {
  let web3 = store.getState().web3.web3Instance
  let merchandiseCheckEtherInstance = store.getState().web3.merchandiseCheckEtherInstance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {
    return function(dispatch) {
      // Get current ethereum wallet.
      web3.eth.getCoinbase((err, coinbase)=>{
        if(err) {
          return console.error(err);
        }

        console.log(coinbase);
        
        
        // merchandiseCheckEtherInstance.getSupplier(coinbase)
        new Promise((resolve, reject) => {
          resolve({name: "hieu"})
        })
        .then(supplier=>{
          dispatch(userLoggedIn(supplier))
          
          // Used a manual redirect here as opposed to a wrapper.
          // This way, once logged in a user can still access the home page.
          var currentLocation = browserHistory.getCurrentLocation()
  
          if ('redirect' in currentLocation.query)
          {
            return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
          }
  
          return browserHistory.push('/app')
        })
        .catch(function(err) {
          // If error, go to signup page.
          console.error("error", err)
  
          return browserHistory.push('/signup')
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
