import { ACTION_TYPES } from '../constants/UserConst';


export const UserReducer = (state = {user: {}}, action) =>  {
    switch (action.type) {
        case ACTION_TYPES.LOGIN_REQUEST:
        case ACTION_TYPES.LOAD_USER_REQUEST:
           return {
              loading: true,
              isAuthenticated: false
           }
           case ACTION_TYPES.LOGIN_SUCCESS:
           case ACTION_TYPES.LOAD_USER_SUCCESS:
           return {
              ...state,
              loading: false,
              isAuthenticated: true,
              user: action.payload
           }
           case ACTION_TYPES.LOGIN_FAIL:
           return {
              ...state,
              loading: false,
              isAuthenticated: false,
              user: null,
              error: action.payload
           }
           case ACTION_TYPES.LOAD_USER_FAIL: {
              return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload  
              }
           }
           case ACTION_TYPES.LOGOUT_USER_SUCCESS: {
             return {
               loading: false,
               isAuthenticated: false,
               user: null
             }
           }
           case ACTION_TYPES.LOGOUT_USER_FAIL: {
              return  {
                 ...state,
                 error: action.payload
              }
           }
           case ACTION_TYPES.CLEAR_ERRORS: {
              return {
                 ...state,
                 error: null,
 
              }
           }
          default: return state
    }
}


