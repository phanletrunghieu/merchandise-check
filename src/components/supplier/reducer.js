import {CREATE_NEW_SUPPLIER, FETCH_LIST_SUPPLIERS, DELETE_SUPPLIER, UPDATE_SUPPLIER} from './constants'

const initialState = {
    suppliers: [],
    data: null
}
  
const supplierReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NEW_SUPPLIER:
            action.supplier.addr = action.supplier.address
            return {
                ...state,
                suppliers: state.suppliers.concat([action.supplier])
            }
        case FETCH_LIST_SUPPLIERS:
            return {
                ...state,
                suppliers: action.suppliers
            }
        case DELETE_SUPPLIER:
            return {
                ...state,
                suppliers: state.suppliers.filter(s=>s.addr != action.supplier.addr)
            }
        case UPDATE_SUPPLIER:
            let suppliers = state.suppliers
            let index = suppliers.findIndex(s=>s.addr===action.supplier.addr)
            suppliers[index] = action.supplier

            return {
                ...state,
                suppliers
            }
        default:
            return state
    }
}

export default supplierReducer