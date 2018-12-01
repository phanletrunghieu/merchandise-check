import {CREATE_NEW_LOG, FETCH_LIST_LOGS} from './constants'

const initialState = {
    logs: [],
    data: null
}
  
const logReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NEW_LOG:
            return {
                ...state,
                logs: state.logs.concat([action.log])
            }
        case FETCH_LIST_LOGS:
            return {
                ...state,
                logs: action.logs
            }
        default:
            return state
    }
}

export default logReducer