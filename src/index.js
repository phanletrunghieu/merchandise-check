import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated, UserIsNotAuthenticated } from './util/wrappers.js'
import getWeb3 from './util/web3/getWeb3'

// Layouts
import Home from './screens/Home'
import App from './screens/App'
import AppIndex from './screens/App/components/index'

import ListProducts from './screens/App/components/products/ListProducts'
import AddProduct from './screens/App/components/products/AddProduct'
import EditProduct from './screens/App/components/products/EditProduct'
import ListSuppliers from './screens/App/components/suppliers/ListSuppliers'
import AddSupplier from './screens/App/components/suppliers/AddSupplier'
import EditSupplier from './screens/App/components/suppliers/EditSupplier'
import ListPartner from './screens/App/components/partner/ListPartner'
import AddPartner from './screens/App/components/partner/AddPartner'
import EditPartner from './screens/App/components/partner/EditPartner'
import ListLogMerchandise from './screens/App/components/log/ListLogMerchandise'
import ListLog from './screens/App/components/log/ListLog'
import ProductDetail from './screens/ProductDetail'
import TermPolicy from './screens/TermPolicy'

// Redux Store
import store from './store'

// marterial-ui
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue'

// Styles
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store)

// Initialize web3 and set in Redux.
getWeb3
.then(results => {
  console.log('Web3 initialized!')
})
.catch(() => {
  console.log('Error in web3 initialization.')
})

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
  // overrides: {
  //   // Name of the component ⚛️ / style sheet
  //   MuiButton: {
  //     // Name of the rule
  //     root: {
  //       // Some CSS
  //       background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  //       borderRadius: 3,
  //       border: 0,
  //       color: 'white',
  //       height: 48,
  //       padding: '0 30px',
  //       boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  //     },
  //   },
  // },
});

ReactDOM.render((
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Router history={history} basename={'/merchandise-check'}>
          <Route path={`${process.env.PUBLIC_URL}/`} component={Home}/>
          <Route path={`${process.env.PUBLIC_URL}/app`} component={UserIsAuthenticated(App)}>
            {/* <IndexRoute component={AppIndex} /> */}
            <IndexRoute component={ListSuppliers} />
            <Route path="products" component={ListProducts} />
            <Route path="products/add" component={AddProduct} />
            <Route path="products/:id/edit" component={EditProduct} />
            <Route path="suppliers" component={ListSuppliers} />
            <Route path="suppliers/add" component={AddSupplier} />
            <Route path="suppliers/:id/edit" component={EditSupplier} />
            <Route path="partner" component={ListPartner} />
            <Route path="partner/add" component={AddPartner} />
            <Route path="partner/:id/edit" component={EditPartner} />
            <Route path="log" component={ListLogMerchandise} />
            <Route path="list" component={ListLog} />
          </Route>
          <Route path={`${process.env.PUBLIC_URL}/check/:productId`} component={ProductDetail}></Route>
          <Route path={`${process.env.PUBLIC_URL}/term`} component={TermPolicy}></Route>
        </Router>
      </MuiThemeProvider>
    </Provider>
  ),
  document.getElementById('root')
)
