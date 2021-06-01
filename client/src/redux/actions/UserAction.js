import { ACTION_TYPES } from '../constants/UserConst';
import axios from 'axios';

// Login
export const login = (email, password) => async (dispatch) => {
    try {
        
      dispatch({type: ACTION_TYPES.LOGIN_REQUEST})
 
      const config = { headers: { "Content-Type": "application/json" }}
 
      const {data } = await axios.post('/api/blog/v1/login', {email,password},config)
 
      dispatch({ type: ACTION_TYPES.LOGIN_SUCCESS, payload: data.user  })
 
    } catch (error) {
        console.log( error.response);
        dispatch({
            type: ACTION_TYPES.LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
 }

 // Get user Info
 export const loadUser = () => async (dispatch) => {
    try {
        
    dispatch({type: ACTION_TYPES.LOAD_USER_REQUEST})
    const { data } = await axios.get('/api/blog/v1/me')
 
      dispatch({ type: ACTION_TYPES.LOAD_USER_SUCCESS, payload: data.user })
 
    } catch (error) {
        dispatch({
            type: ACTION_TYPES.LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
 }

 // Register
export const logout = () => async (dispatch) => {
    try {
        
    await axios.get('/api/blog/v1/logout')
      dispatch({
          type: ACTION_TYPES.LOGOUT_USER_SUCCESS
     })
 
    } catch (error) {
        dispatch({
            type: ACTION_TYPES.LOGOUT_USER_FAIL,
            payload: error.response.data.message
        })
    }
 }


// Clear Errors
export const clearError = () => async (dispatch) => {
    dispatch({
        type: ACTION_TYPES.CLEAR_ERRORS
    })
}
