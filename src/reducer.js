import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './components/user/reducer'
import supplierReducer from './components/supplier/reducer'
import productReducer from './components/product/reducer'
import partnerReducer from './components/partner/reducer'
import logReducer from './components/log/reducer'
import web3Reducer from './util/web3/web3Reducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  web3: web3Reducer,
  supplier: supplierReducer,
  partner: partnerReducer,
  log: logReducer,
  product: productReducer
})

export default reducer
