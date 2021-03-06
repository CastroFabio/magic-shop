import {
	ProductCartContainer,
	Footer,
	Name,
	Price,
} from "./productCard.styles.jsx"

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component"

import { useContext } from "react"

import { CartContext } from "../../context/cart.context"

const ProductCard = ({ product }) => {
	const { addItemToCart } = useContext(CartContext)
	const { name, price, imageUrl } = product

	const addProductToCart = () => addItemToCart(product)

	return (
		<ProductCartContainer>
			<img src={imageUrl} alt={`${name}`} />
			<Footer>
				<Name>{name}</Name>
				<Price>{price}</Price>
			</Footer>
			<Button
				buttonType={BUTTON_TYPE_CLASSES.inverted}
				onClick={addProductToCart}
			>
				Add to card
			</Button>
		</ProductCartContainer>
	)
}

export default ProductCard
