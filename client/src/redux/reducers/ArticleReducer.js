import {ACTION_TYPES} from '../constants/ArticleConst';

export const ArticleReducer = ( state = { articles:[] }, action) => {
    switch (action.type) {
     case ACTION_TYPES.ALL_PRODUCTS_REQUEST: 
       return  {
           loading: true,
           articles: []
       }
       case ACTION_TYPES.ALL_PRODUCTS_SUCCESS: 
       return  {
           loading: false,
           articles: action.payload.products
       }
       case ACTION_TYPES.ALL_PRODUCTS_FAIL:
       return  {
           loading: false,
           error: action.payload
       }
       case ACTION_TYPES.CLEAR_ERRORS: 
       return  {
           ...state,
           error: null,
       }
        default: return state;
    }
}

// Create a new Article
export const NewArticleReducer = (state = { product: {}}, action) => {
    switch (action.type) {
        case ACTION_TYPES.NEW_PRODUCT_REQUEST: 
        return  {
            ...state,
            loading: true,
        }
        case ACTION_TYPES.NEW_PRODUCT_SUCCESS: 
        return  {
            loading: false,
            success: action.payload.success,
            product: action.payload.product
        }
        case ACTION_TYPES.NEW_PRODUCT_FAIL: 
        return  {
            ...state,
            loading: false,
            error: action.payload
        }
        case ACTION_TYPES.NEW_PRODUCT_RESET: 
        return  {
            ...state,
            success: false
        }
        case ACTION_TYPES.CLEAR_ERRORS: 
           return  {
               ...state,
               error: null,
           }
        default: 
          return state;
    }
}

export const ActionsProductReducer = (state = {}, action) => {
    switch (action.type) {
        case ACTION_TYPES.DELETE_PRODUCT_REQUEST: 
          case ACTION_TYPES.UPDATE_PRODUCT_REQUEST:
        return  {
            ...state,
            loading: true,
        }
        case ACTION_TYPES.DELETE_PRODUCT_SUCCESS: 
        return  {
            ...state,
            loading: false,
            isDeleted: action.payload
        }
        case ACTION_TYPES.UPDATE_PRODUCT_SUCCESS: 
        return  {
            ...state,
            loading: false,
            isUpdated: action.payload
        }
        case ACTION_TYPES.DELETE_PRODUCT_FAIL: 
          case ACTION_TYPES.UPDATE_PRODUCT_FAIL:
        return  {
            ...state,
            loading: false,
            error: action.payload
        }
        case ACTION_TYPES.DELETE_PRODUCT_RESET: 
        return  {
            ...state,
            isDeleted: false
        }
        case ACTION_TYPES.UPDATE_PRODUCT_RESET: 
        return  {
            ...state,
            isUpdated: false
        }
        case ACTION_TYPES.CLEAR_ERRORS: 
           return  {
               ...state,
               error: null,
           }
        default: 
          return state;
    }
}

export const ArticleDetailReducer = (state = { article: {}}, action) => {
    switch (action.type) {
        case ACTION_TYPES.GET_PRODUCT_DETAILS_REQUEST: 
        return  {
            ...state,
            loading: true,
        }
        case ACTION_TYPES.GET_PRODUCT_DETAILS_SUCCESS: 
        return  {
            loading: false,
            article: action.payload.article
        }
        case ACTION_TYPES.GET_PRODUCT_DETAILS_FAIL: 
        return  {
            ...state,
            loading: false,
            error: action.payload
        }
        case ACTION_TYPES.CLEAR_ERRORS: 
           return  {
               ...state,
               error: null,
           }
        default: 
          return state;
    }
}




