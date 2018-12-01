import {CREATE_NEW_PRODUCT, FETCH_LIST_PRODUCTS, GRANT_PRODUCT_TO_PARTNER, FETCH_LIST_PRODUCTS_BY_PARTNER, DELETE_PRODUCT, UPDATE_PRODUCT} from './constants'

const initialState = {
    products: [],
    productsByPartner: [],
    data: null
}
  
const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NEW_PRODUCT:
            return {
                ...state,
                products: state.products.concat([action.product])
            }
        case FETCH_LIST_PRODUCTS:
            return {
                ...state,
                products: action.products
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(p=>p.id !== action.product.id)
            }
        case UPDATE_PRODUCT:
            let products = state.products
            let index = products.findIndex(p=>p.id===action.product.id)
            products[index] = action.product

            return {
                ...state,
                products
            }
        case FETCH_LIST_PRODUCTS_BY_PARTNER:
            return {
                ...state,
                productsByPartner: action.products
            }
        case GRANT_PRODUCT_TO_PARTNER:
            let productsByPartner = state.productsByPartner.filter(p=>p.id!==action.product.ID)
            if(action.isGrant){
                productsByPartner.push(action.product)
            }
            
            return {
                ...state,
                productsByPartner
            }
        default:
            return state
    }
}

export default productReducer