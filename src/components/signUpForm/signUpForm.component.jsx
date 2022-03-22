import { useState } from "react"
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils"
import FormInput from "../formInput/formInput.component"
import "./signUpForm.styles.scss"
import Button from "../button/button.component"

const defaultFormFields = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
}

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields)
	const { displayName, email, password, confirmPassword } = formFields

	const resetFormFields = () => {
		setFormFields(defaultFormFields)
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		if (password !== confirmPassword) {
			alert("As senhas não são iguais")
			return
		}

		try {
			const { user } = await createAuthUserWithEmailAndPassword(email, password)

			await createUserDocumentFromAuth(user, { displayName })
			resetFormFields()
		} catch (error) {
			if (error.code === "auth/email-already-in-use") {
				alert("Esse email já foi utilizado. Por favor, cadastre-se com outro.")
			}
		}
	}

	const handleChange = (event) => {
		const { name, value } = event.target
		setFormFields({ ...formFields, [name]: value })
	}

	return (
		<div className='sign-up-container'>
			<h2>Não tem uma conta?</h2>
			<span>Cadastre-se com seu email e senha</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Display Name'
					type='text'
					required
					onChange={handleChange}
					name='displayName'
					value={displayName}
				/>
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
				<FormInput
					label='Confirmar Senha'
					type='password'
					required
					onChange={handleChange}
					name='confirmPassword'
					value={confirmPassword}
				/>
				<Button type='submit'>Cadastre-se</Button>
			</form>
		</div>
	)
}
export default SignUpForm
