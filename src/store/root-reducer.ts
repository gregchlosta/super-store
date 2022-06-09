import { combineReducers } from 'redux'

import { userReducer } from './user/user.reducer'
import { categoriesReducer } from './categories/category.model'
import { cartReducer } from './cart/cart.model'

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
})
