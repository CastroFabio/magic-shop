import { useState } from "react"
import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
	signAuthInWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils"
import FormInput from "../formInput/formInput.component"
import "./signInForm.styles.scss"
import Button from "../button/button.component"

const defaultFormFields = {
	email: "",
	password: "",
}

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields)
	const { email, password } = formFields

	const resetFormFields = () => {
		setFormFields(defaultFormFields)
	}

	const handleSubmit = async (event) => {
		event.preventDefault()

		try {
			const { user } = await signAuthInWithEmailAndPassword(email, password)

			resetFormFields()
		} catch (error) {
			switch (error.code) {
				case "auth/wrong-password":
					alert("incorrect password for email")
					break
				case "auth/user-not-found":
					alert("no user associated with this email")
					break
				default:
					console.log(error)
			}
		}
	}

	const signInWithGoogle = async () => {
		await signInWithGooglePopup()
	}

	const handleChange = (event) => {
		const { name, value } = event.target
		setFormFields({ ...formFields, [name]: value })
	}

	return (
		<div className='sign-up-container'>
			<h2>Já possui uma conta?</h2>
			<span>Entre com seu email e senha</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Email'
					type='email'
					required
					onChange={handleChange}
					name='email'
					value={email}
				/>
				<FormInput
					label='Senha'
					type='password'
					required
					onChange={handleChange}
					name='password'
					value={password}
				/>
				<div className='buttons-container'>
					<Button type='submit'>Entre</Button>
					<Button type='button' buttonType='google' onClick={signInWithGoogle}>
						Entre com google
					</Button>
				</div>
			</form>
		</div>
	)
}
export default SignInForm
