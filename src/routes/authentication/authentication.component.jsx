import SignUpForm from "../../components/signUpForm/signUpForm.component"
import SignInForm from "../../components/signInForm/signInForm.component"
import "./authentication.styles.scss"
const Authentication = () => {
	return (
		<div className='authentication-container'>
			<h1>Sign In Page</h1>
			<SignInForm />
			<SignUpForm />
		</div>
	)
}

export default Authentication
