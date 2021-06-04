import axios from 'axios';
import {ACTION_TYPES} from '../constants/ArticleConst';

export const getArticles = () => async (dispatch) => {
    try {
       
        dispatch({type: ACTION_TYPES.ALL_PRODUCTS_REQUEST})
        
        const { data }  = await axios.get(`/api/blog/v1/articles`)
                
        dispatch({
            type: ACTION_TYPES.ALL_PRODUCTS_SUCCESS,
            payload: data
        })

    } catch (error) {
     dispatch({
         type: ACTION_TYPES.ALL_PRODUCTS_FAIL,
         payload: error.response.data.message
     })   
    }
}

export const getArticleDetails = (id) => async (dispatch) => {
    try {
       
        dispatch({type: ACTION_TYPES.GET_PRODUCT_DETAILS_REQUEST})

        const { data }  = await axios.get(`/api/blog/v1/article/${id}`)
        
        dispatch({
            type: ACTION_TYPES.GET_PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
     dispatch({
         type: ACTION_TYPES.GET_PRODUCT_DETAILS_FAIL,
         payload: error.response.data.message
     })   
    }
}


export const updateArticle = (id,articleData) => async (dispatch) => {
    try {
       
        dispatch({type: ACTION_TYPES.UPDATE_PRODUCT_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        const { data }  = await axios.put(`/api/blog/v1/article/${id}`,articleData,config);

        dispatch({
            type: ACTION_TYPES.UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
     dispatch({
         type: ACTION_TYPES.UPDATE_PRODUCT_FAIL,
         payload: error.response.data.message
     })   
    }
}


export const createArticle = (newArticle) => async (dispatch) => {
    try {
       
        dispatch({type: ACTION_TYPES.NEW_PRODUCT_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data }  = await axios.post(`/api/blog/v1/article/new`,newArticle,config);
        
        dispatch({
            type: ACTION_TYPES.NEW_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
     dispatch({
         type: ACTION_TYPES.NEW_PRODUCT_FAIL,
         payload: error.response.data.message
     })   
    }
}


export const deleteArticle = (id) => async (dispatch) => {
    try {
       
        dispatch({type: ACTION_TYPES.DELETE_PRODUCT_REQUEST})
        const { data }  = await axios.delete(`/api/blog/v1/article/${id}`);
        
        dispatch({
            type: ACTION_TYPES.DELETE_PRODUCT_SUCCESS,
            payload: data
        })
        dispatch(getArticles());

    } catch (error) {
     dispatch({
         type: ACTION_TYPES.DELETE_PRODUCT_FAIL,
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
