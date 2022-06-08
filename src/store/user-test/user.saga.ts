import { takeLatest, put, all, call } from 'typed-redux-saga/macro'

import { USER_ACTION_TYPES } from './user.model'

import { actions } from './user.model'

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
  AdditionalInformation,
  UserData,
} from '../../utils/firebase/firebase.utils'
import { User } from 'firebase/auth'

export function* getSnapshotFromUserAuth(
  userAuth: User,
  additionalDetails?: AdditionalInformation
) {
  try {
    const userSnapshot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    )
    if (userSnapshot) {
      yield* put(
        actions.signIn.success({ id: userSnapshot.id, ...userSnapshot.data() })
      )
    }
  } catch (error) {
    yield* put(actions.signIn.failure(error as Error))
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup)
    yield* call(getSnapshotFromUserAuth, user)
  } catch (error) {
    yield* put(actions.signIn.failure(error as Error))
  }
}

export function* signInWithEmail({
  payload: { email, password },
}: ReturnType<typeof actions.signInWithEmail.request>) {
  try {
    const userCredencial = yield* call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    )

    if (userCredencial) {
      const { user } = userCredencial
      yield* call(getSnapshotFromUserAuth, user)
    }
  } catch (error) {
    yield* put(actions.signIn.failure(error as Error))
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser)
    if (!userAuth) return
    yield* call(getSnapshotFromUserAuth, userAuth)
  } catch (error) {
    yield* put(actions.signIn.failure(error as Error))
  }
}

export function* signUp({
  payload: { email, password, displayName },
}: ReturnType<typeof actions.signUp.request>) {
  try {
    const userCredencial = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    )

    if (userCredencial) {
      const { user } = userCredencial
      yield* put(actions.signUp.success())
    }
  } catch (error) {
    yield* put(actions.signUp.failure(error as Error))
  }
}

export function* signOut() {
  try {
    yield* call(signOutUser)
    yield* put(actions.signOut.success(null))
  } catch (error) {
    yield* put(actions.signOut.failure(error as Error))
  }
}

export function* signInAfterSignUp({
  payload: { user, additionalDetails },
}: ReturnType<typeof actions.signIn.request>) {
  yield* call(getSnapshotFromUserAuth, user, additionalDetails)
}

export function* onGoogleSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onEmailSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onSignUpStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* onSignOutStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}

export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ])
}
