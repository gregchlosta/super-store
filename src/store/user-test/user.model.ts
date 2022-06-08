import { User } from 'firebase/auth'
import {
  ActionType,
  createAction,
  createAsyncAction,
  getType,
} from 'typesafe-actions'
import {
  AdditionalInformation,
  UserData,
} from '../../utils/firebase/firebase.utils'

export enum USER_ACTION_TYPES {
  SET_CURRENT_USER = 'user/SET_CURRENT_USER',
  CHECK_USER_SESSION = 'user/CHECK_USER_SESSION',
  GOOGLE_SIGN_IN_START = 'user/GOOGLE_SIGN_IN_START',
  EMAIL_SIGN_IN_START = 'user/EMAIL_SIGN_IN_START',
  SIGN_IN_START = 'user/SIGN_IN_START',
  SIGN_IN_SUCCESS = 'user/SIGN_IN_SUCCESS',
  SIGN_IN_FAILED = 'user/SIGN_IN_FAILED',
  SIGN_UP_START = 'user/SIGN_UP_START',
  SIGN_UP_SUCCESS = 'user/SIGN_UP_SUCCESS',
  SIGN_UP_FAILED = 'user/SIGN_UP_FAILED',
  SIGN_OUT_START = 'user/SIGN_OUT_START',
  SIGN_OUT_SUCCESS = 'user/SIGN_OUT_SUCCESS',
  SIGN_OUT_FAILED = 'user/SIGN_OUT_FAILED',
}

export const setCurrentUser = createAction(
  USER_ACTION_TYPES.SET_CURRENT_USER
)<UserData>()

export const checkUserSession = createAction(
  USER_ACTION_TYPES.CHECK_USER_SESSION
)<void>()

export const signInWithEmail = createAsyncAction(
  USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
  USER_ACTION_TYPES.SIGN_IN_SUCCESS,
  USER_ACTION_TYPES.SIGN_IN_FAILED
)<{ email: string; password: string }, UserData & { id: string }, Error>()

export const signInWithGoogle = createAsyncAction(
  USER_ACTION_TYPES.GOOGLE_SIGN_IN_START,
  USER_ACTION_TYPES.SIGN_IN_SUCCESS,
  USER_ACTION_TYPES.SIGN_IN_FAILED
)<void, UserData & { id: string }, Error>()

export const signIn = createAsyncAction(
  USER_ACTION_TYPES.SIGN_IN_START,
  USER_ACTION_TYPES.SIGN_IN_SUCCESS,
  USER_ACTION_TYPES.SIGN_IN_FAILED
)<
  { user: User; additionalDetails: AdditionalInformation },
  UserData & { id: string },
  Error
>()

export const signUp = createAsyncAction(
  USER_ACTION_TYPES.SIGN_UP_START,
  USER_ACTION_TYPES.SIGN_UP_SUCCESS,
  USER_ACTION_TYPES.SIGN_UP_FAILED
)<
  { email: string; password: string; displayName: string },
  UserData & { id: string },
  Error
>()

export const signOut = createAsyncAction(
  USER_ACTION_TYPES.SIGN_OUT_START,
  USER_ACTION_TYPES.SIGN_OUT_SUCCESS,
  USER_ACTION_TYPES.SIGN_OUT_FAILED
)<void, null, Error>()

export const actions = {
  setCurrentUser,
  checkUserSession,
  signInWithEmail,
  signInWithGoogle,
  signIn,
  signUp,
  signOut,
}

export interface IModel {
  readonly currentUser: UserData | null
  readonly isLoading: boolean
  readonly error: Error | null
}

const INITIAL_STATE: IModel = {
  currentUser: null,
  isLoading: false,
  error: null,
}

export const userReducer = (
  state: IModel = INITIAL_STATE,
  action: ActionType<typeof actions>
): IModel => {
  switch (action.type) {
    case getType(setCurrentUser):
      return { ...state, currentUser: action.payload }

    case getType(checkUserSession):
      return { ...state }

    case getType(signInWithEmail.request):
      return { ...state, isLoading: true }
    case getType(signInWithEmail.success):
      return { ...state, currentUser: action.payload, isLoading: false }
    case getType(signInWithEmail.failure):
      return { ...state, error: action.payload, isLoading: false }

    case getType(signInWithGoogle.request):
      return { ...state, isLoading: true }
    case getType(signInWithGoogle.success):
      return { ...state, currentUser: action.payload, isLoading: false }
    case getType(signInWithGoogle.failure):
      return { ...state, error: action.payload, isLoading: false }

    case getType(signIn.request):
      return { ...state, isLoading: true }
    case getType(signIn.success):
      return { ...state, currentUser: action.payload, isLoading: false }
    case getType(signIn.failure):
      return { ...state, error: action.payload, isLoading: false }

    case getType(signUp.request):
      return { ...state, isLoading: true }
    case getType(signUp.success):
      return { ...state, currentUser: action.payload, isLoading: false }
    case getType(signUp.failure):
      return { ...state, error: action.payload, isLoading: false }

    case getType(signOut.request):
      return { ...state, isLoading: true }
    case getType(signOut.success):
      return { ...state, currentUser: action.payload, isLoading: false }
    case getType(signOut.failure):
      return { ...state, error: action.payload, isLoading: false }

    default:
      return state
  }
}
