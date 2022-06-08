import { takeLatest, all, call, put } from 'typed-redux-saga/macro'

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils'

import { CATEGORIES_ACTION_TYPES, fetchCategories } from './category.model'

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield* call(getCategoriesAndDocuments)
    yield* put(fetchCategories.success(categoriesArray))
  } catch (error) {
    yield* put(fetchCategories.failure(error as Error))
  }
}

export function* onFetchCategories() {
  yield* takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  )
}

export function* categoriesSaga() {
  yield* all([call(onFetchCategories)])
}
