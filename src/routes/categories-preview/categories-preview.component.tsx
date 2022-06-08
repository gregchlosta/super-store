import { Fragment } from 'react'
import { useCategories } from '../../store/categories/category.hook'
import CategoryPreview from '../../components/category-preview/category-preview.component'
import Spinner from '../../components/spinner/spinner.component'

const CategoriesPreview = () => {
  const { categoriesMap, isLoading } = useCategories()

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title]
          return (
            <CategoryPreview key={title} title={title} products={products} />
          )
        })
      )}
    </Fragment>
  )
}

export default CategoriesPreview
