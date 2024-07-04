import CartProduct from "./CartProduct"

const CartProducts = ({cart, buttons}) => {
    return cart?.map(cartProduct => (
        <CartProduct 
            cartProduct={cartProduct}
            key={cartProduct.ID}
            buttons={buttons}
        />
    ))
}

export default CartProducts