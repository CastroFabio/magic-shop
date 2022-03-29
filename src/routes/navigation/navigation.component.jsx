import React, { Fragment, useContext } from "react"
import { Outlet } from "react-router-dom"

import CartIcon from "../../components/cartIcon/cartIcon.component"
import CartDropdown from "../../components/cartDropdown/cartDropdown.component"

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"

import {
	NavigationContainer,
	NavLinks,
	NavLink,
	LogoContainer,
} from "./navigation.styles"

import { UserContext } from "../../context/user.context"
import { CartContext } from "../../context/cart.context"

import { signOutUser } from "../../utils/firebase/firebase.utils"

const Navigation = () => {
	const { currentUser } = useContext(UserContext)
	const { isCartOpen } = useContext(CartContext)
	return (
		<Fragment>
			<NavigationContainer>
				<LogoContainer to='/'>
					<CrwnLogo className='logo' />
				</LogoContainer>
				<NavLinks>
					<NavLink to='/shop'>SHOP</NavLink>

					{currentUser ? (
						<NavLink as='span' onClick={signOutUser}>
							SIGN OUT
						</NavLink>
					) : (
						<NavLink to='/auth'>SIGN IN</NavLink>
					)}
					<CartIcon />
				</NavLinks>
				{isCartOpen && <CartDropdown />}
			</NavigationContainer>
			<Outlet />
		</Fragment>
	)
}

export default Navigation
