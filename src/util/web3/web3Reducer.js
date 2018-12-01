const initialState = {
    web3Instance: null,
    merchandiseCheckWeb3Instance: null,
    merchandiseCheckEtherInstance: null,
}

const web3Reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'WEB3_INITIALIZED':
            return Object.assign({}, state, {
                web3Instance: action.payload.web3Instance,
                merchandiseCheckEtherInstance: action.payload.merchandiseCheckEtherInstance,
                merchandiseCheckWeb3Instance: action.payload.merchandiseCheckWeb3Instance,
            })
        default:
            return state
    }
}

export default web3Reducer
