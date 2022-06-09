import { FC } from 'react'
import { useCart } from '../../store/cart/cart.hook'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'

import {
  ProductCartContainer,
  Footer,
  Name,
  Price,
} from './product-card.styles'
import { CategoryItem } from '../../store/categories/category.model'

export type ProductCardProps = {
  product: CategoryItem
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { name, price, imageUrl } = product

  const { cartItems, addItemToCart } = useCart()

  const addProductToCart = () => addItemToCart(cartItems, product)

  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to card
      </Button>
    </ProductCartContainer>
  )
}

export default ProductCard
