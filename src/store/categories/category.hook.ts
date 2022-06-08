import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from 'reselect'
import { RootState } from '../store'
import { IModel, CategoryMap, fetchCategories } from './category.model'

const selectCategoryReducer = (state: RootState): IModel => state.categories

const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
)

const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap =>
    categories.reduce((acc, category) => {
      const { title, items } = category
      acc[title.toLowerCase()] = items
      return acc
    }, {} as CategoryMap)
)

const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
)

export const useCategories = () => {
  const dispatch = useDispatch()

  const categories = useSelector(selectCategories)
  const categoriesMap = useSelector(selectCategoriesMap)
  const isLoading = useSelector(selectCategoriesIsLoading)

  function fetchAllCategories() {
    dispatch(fetchCategories.request())
  }

  return {
    categories,
    categoriesMap,
    isLoading,
    fetchAllCategories,
  }
}
