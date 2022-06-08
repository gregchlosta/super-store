import { ActionType, createAsyncAction, getType } from 'typesafe-actions'
import { CATEGORIES_ACTION_TYPES, Category } from '../categories/category.types'

export const fetchCategories = createAsyncAction(
  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED
)<void, Category[], Error>()

export interface IModel {
  readonly categories: Category[]
  readonly isLoading: boolean
  readonly error: Error | null
}

export const CATEGORIES_INITIAL_STATE: IModel = {
  categories: [],
  isLoading: false,
  error: null,
}

export const categoriesReducer = (
  state: IModel = CATEGORIES_INITIAL_STATE,
  action: ActionType<typeof fetchCategories>
): IModel => {
  switch (action.type) {
    case getType(fetchCategories.request):
      return { ...state, isLoading: true }
    case getType(fetchCategories.success):
      return { ...state, categories: action.payload, isLoading: false }
    case getType(fetchCategories.failure):
      return { ...state, error: action.payload, isLoading: false }
    default:
      return state
  }
}
