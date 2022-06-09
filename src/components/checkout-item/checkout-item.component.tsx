import { FC } from 'react'

import { useCart } from '../../store/cart/cart.hook'

import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from './checkout-item.styles'
import { CartItem } from '../../store/cart/cart.model'

export type CheckoutItemProps = {
  cartItem: CartItem
}

const CheckoutItem: FC<CheckoutItemProps> = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem

  const { cartItems, addItemToCart, clearItemFromCart, removeItemFromCart } =
    useCart()

  const clearItemHandler = () => clearItemFromCart(cartItems, cartItem)
  const addItemHandler = () => addItemToCart(cartItems, cartItem)
  const removeItemHandler = () => removeItemFromCart(cartItems, cartItem)

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan> {name} </BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan> {price}</BaseSpan>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem
