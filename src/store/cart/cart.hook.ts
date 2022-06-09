import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from 'reselect'
import { CartItem, actions } from './cart.model'
import { CategoryItem } from '../categories/category.model'
import { RootState } from '../store'

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  )

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (
  cartItems: CartItem[],
  cartItemToRemove: CartItem
): CartItem[] => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  )

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  )
}

const clearCartItem = (
  cartItems: CartItem[],
  cartItemToClear: CartItem
): CartItem[] =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)

const selectCartReducer = (state: RootState) => state.cart

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
)

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
)

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total: number, cartItem: CartItem) => total + cartItem.quantity,
    0
  )
)

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total: number, cartItem: CartItem) =>
      total + cartItem.quantity * cartItem.price,
    0
  )
)

export const useCart = () => {
  const dispatch = useDispatch()

  const cartItems = useSelector(selectCartItems)
  const isCartOpen = useSelector(selectIsCartOpen)
  const cartCount = useSelector(selectCartCount)
  const cartTotal = useSelector(selectCartTotal)

  function setIsCartOpen(value: boolean) {
    dispatch(actions.setIsCartOpen(value))
  }

  function addItemToCart(cartItems: CartItem[], productToAdd: CategoryItem) {
    const newCartItems = addCartItem(cartItems, productToAdd)
    dispatch(actions.setCartItems(newCartItems))
  }

  function removeItemFromCart(
    cartItems: CartItem[],
    cartItemToRemove: CartItem
  ) {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove)
    dispatch(actions.setCartItems(newCartItems))
  }

  function clearItemFromCart(cartItems: CartItem[], cartItemToClear: CartItem) {
    const newCartItems = clearCartItem(cartItems, cartItemToClear)
    dispatch(actions.setCartItems(newCartItems))
  }

  return {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    cartCount,
    cartTotal,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
  }
}
