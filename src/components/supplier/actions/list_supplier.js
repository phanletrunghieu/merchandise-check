import {CREATE_NEW_SUPPLIER,FETCH_LIST_SUPPLIERS} from '../constants'
import store from '../../../store'


function supplierList(suppliers) {
    return {
        type: FETCH_LIST_SUPPLIERS,
        suppliers
    }
}

export function listSupplier() {
    let web3 = store.getState().web3.web3Instance
    let merchandiseCheckEtherInstance = store.getState().web3.merchandiseCheckEtherInstance

    // Double-check web3's status.
    if (typeof web3 !== 'undefined') {
        return function(dispatch) {
            merchandiseCheckEtherInstance.getListSuppliers()
            .then(suppliers=>dispatch(supplierList(suppliers)))
        }
    } else {
        console.error('Web3 is not initialized.');
    }
}
