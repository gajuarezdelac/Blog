import { createStore,combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { UserReducer } from './reducers/UserReducer';
import {ArticleReducer, NewArticleReducer, ActionsProductReducer,ArticleDetailReducer} from './reducers/ArticleReducer';

const reducer = combineReducers({
  UserReducer,
  ArticleReducer,
  NewArticleReducer,
  ActionsProductReducer,
  ArticleDetailReducer
})
// Unicamente se uso en la parte del agregado al carrito
let initialState = {
//    cart: {
//      cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
//      shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {}
//     },
}

// Middleware
const middleware = [thunk];

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;