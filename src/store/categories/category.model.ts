import { ActionType, createAsyncAction, getType } from 'typesafe-actions'

export enum CATEGORIES_ACTION_TYPES {
  FETCH_CATEGORIES_START = 'category/FETCH_CATEGORIES_START',
  FETCH_CATEGORIES_SUCCESS = 'category/FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_FAILED = 'category/FETCH_CATEGORIES_FAILED',
}

export type CategoryItem = {
  id: number
  imageUrl: string
  name: string
  price: number
}

export type Category = {
  title: string
  imageUrl: string
  items: CategoryItem[]
}

export type CategoryMap = {
  [key: string]: CategoryItem[]
}

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
