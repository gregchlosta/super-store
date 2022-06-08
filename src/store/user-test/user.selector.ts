import { createSelector } from 'reselect'
import { RootState } from '../store'
import { IModel } from './user.model'

export const selectUserReducer = (state: RootState): IModel => state.user

export const selectCurrentUser = createSelector(
  selectUserReducer,
  (user) => user.currentUser
)
