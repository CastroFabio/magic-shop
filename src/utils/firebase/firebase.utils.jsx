import { initializeApp } from "firebase/app"
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

const firebaseConfig = {
	apiKey: "AIzaSyCV3EqHorgrVefhX6GuUyKeNeJn2X1DlkQ",
	authDomain: "mgk-shop-db.firebaseapp.com",
	projectId: "mgk-shop-db",
	storageBucket: "mgk-shop-db.appspot.com",
	messagingSenderId: "372018192361",
	appId: "1:372018192361:web:ca9c428ec81f2a4284b578",
}

const firebaseApp = initializeApp(firebaseConfig)

const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
	prompt: "select_account",
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, googleProvider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInformation = {}
) => {
	if (!userAuth) return

	const userDocRef = doc(db, "users", userAuth.uid)

	const userSnapshot = await getDoc(userDocRef)

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth
		const createdAt = new Date()
		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation,
			})
		} catch (error) {
			console.log("error creating user", error.message)
		}
	}
	return userDocRef
}

export const signAuthInWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return
	return await signInWithEmailAndPassword(auth, email, password)
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return
	return await createUserWithEmailAndPassword(auth, email, password)
}