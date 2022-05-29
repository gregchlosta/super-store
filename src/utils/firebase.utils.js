import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBe4-Ul0BLXE2Zptc9RHv1VkVhCoKQ4wDE',
  authDomain: 'super-store-e24f8.firebaseapp.com',
  projectId: 'super-store-e24f8',
  storageBucket: 'super-store-e24f8.appspot.com',
  messagingSenderId: '81630968328',
  appId: '1:81630968328:web:b23499ba050bbda4292fbd',
  measurementId: 'G-23FNDYXDJE',
}

initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account',
})

export const auth = getAuth()

export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation
) => {
  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapshot = await getDoc(userDocRef)

  if (userSnapshot.exists()) {
    return userDocRef
  }

  const { displayName, email } = userAuth
  const createdAt = new Date()

  try {
    await setDoc(userDocRef, {
      displayName,
      email,
      createdAt,
      ...(additionalInformation = {}),
    })
  } catch (error) {
    console.log(error.message)
  }

  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password)
}
