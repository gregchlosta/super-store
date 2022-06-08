import { FC } from 'react'
import { CategoryItem } from '../../store/categories/category.model'
import ProductCard from '../product-card/product-card.component'

import {
  CategoryPreviewContainer,
  Title,
  Preview,
} from './category-preview.styles'

export type CategoryPreviewType = {
  title: string
  products: CategoryItem[]
}

const CategoryPreview: FC<CategoryPreviewType> = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={title}>{title.toUpperCase()}</Title>
      </h2>
      <Preview>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CategoryPreviewContainer>
  )
}

export default CategoryPreview
