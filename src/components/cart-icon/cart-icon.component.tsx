import { useCart } from '../../store/cart/cart.hook'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

import { CartIconContainer, ItemCount } from './cart-icon.styles'

const CartIcon = () => {
  const { cartCount, isCartOpen, setIsCartOpen } = useCart()

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className='shopping-icon' />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon
