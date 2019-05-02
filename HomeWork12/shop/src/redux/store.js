import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import shopReducer from './shop/shop-reducer'
import cartReducer from './cart/cart-reducer'

const rootReducer = combineReducers({
    shop: shopReducer,
    cart: cartReducer
})

export default function configureStore() {
  const middlewares = [thunkMiddleware]
  const middleWareEnhancer = applyMiddleware(...middlewares)

  const store = createStore(rootReducer, compose(middleWareEnhancer))

  return store
}
