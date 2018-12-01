import {CREATE_NEW_PARTNER, FETCH_LIST_PARTNERS, DELETE_PARTNER, UPDATE_PARTNER} from './constants'

const initialState = {
    partners: [],
    data: null
}
  
const partnerReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NEW_PARTNER:
            if(action.partner.address)
                action.partner.addr = action.partner.address
            return {
                ...state,
                partners: state.partners.concat([action.partner])
            }
        case FETCH_LIST_PARTNERS:
            return {
                ...state,
                partners: action.partners
            }
        case DELETE_PARTNER:
            return {
                ...state,
                partners: state.partners.filter(s=>s.id != action.partner.id)
            }
        case UPDATE_PARTNER:
            let partners = state.partners
            let index = partners.findIndex(s=>s.id===action.partner.id)
            partners[index] = action.partner

            return {
                ...state,
                partners
            }
        default:
            return state
    }
}

export default partnerReducer