import { initializeApp } from "firebase/app"
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
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

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
	prompt: "select_account",
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
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
			})
		} catch (error) {
			console.log("error creating user", error.message)
		}
	}
	return userDocRef
}
