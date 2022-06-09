import { ActionType, createAction, getType } from 'typesafe-actions'

import { CategoryItem } from '../categories/category.model'

export enum CART_ACTION_TYPES {
  SET_IS_CART_OPEN = 'cart/SET_IS_CART_OPEN',
  SET_CART_ITEMS = 'cart/SET_CART_ITEMS',
}

export type CartItem = CategoryItem & {
  quantity: number
}

export const setIsCartOpen = createAction(
  CART_ACTION_TYPES.SET_IS_CART_OPEN
)<boolean>()

export const setCartItems = createAction(CART_ACTION_TYPES.SET_CART_ITEMS)<
  CartItem[]
>()

export const actions = {
  setIsCartOpen,
  setCartItems,
}

export interface IModel {
  readonly isCartOpen: boolean
  readonly cartItems: CartItem[]
}

export const CART_INITIAL_STATE: IModel = {
  isCartOpen: false,
  cartItems: [],
}

export const cartReducer = (
  state: IModel = CART_INITIAL_STATE,
  action: ActionType<typeof actions>
): IModel => {
  switch (action.type) {
    case getType(setIsCartOpen):
      return { ...state, isCartOpen: action.payload }
    case getType(setCartItems):
      return { ...state, cartItems: action.payload }
    default:
      return state
  }
}
