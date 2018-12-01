import { UserAuthWrapper } from 'redux-auth-wrapper'
import { routerActions } from 'react-router-redux'

// Layout Component Wrappers

export const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.user.data,
  redirectAction: routerActions.replace,
  failureRedirectPath: '/', // '/login' by default.
  wrapperDisplayName: 'UserIsAuthenticated'
})

export const UserIsNotAuthenticated = UserAuthWrapper({
  authSelector: state => state.user,
  redirectAction: routerActions.replace,
  failureRedirectPath: (state, ownProps) => ownProps.location.query.redirect || '/dashboard',
  wrapperDisplayName: 'UserIsNotAuthenticated',
  predicate: user => user.data === null,
  allowRedirectBack: false
})

// UI Component Wrappers

export const VisibleOnlyAuth = UserAuthWrapper({
  authSelector: state => state.user,
  wrapperDisplayName: 'VisibleOnlyAuth',
  predicate: user => user.data,
  FailureComponent: null
})

export const HiddenOnlyAuth = UserAuthWrapper({
  authSelector: state => state.user,
  wrapperDisplayName: 'HiddenOnlyAuth',
  predicate: user => user.data === null,
  FailureComponent: null
})

export function convertNomalString(i){
  let inputs = ["đ", "Đ", "ã"]
  let outputs = ["d", "D", "a"]
  for (let index = 0; index < inputs.length; index++) {
    
   i = i.replace(inputs[index], outputs[index])
  }
  return i
}

export function random(from, to){
  return Math.floor((Math.random() * to) + from);
}