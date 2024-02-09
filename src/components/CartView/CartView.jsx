import { Link } from "react-router-dom"
import { useCart } from "../../context/CartContext"

const CartView = () => {

    const { cart, total, removeItem } = useCart()

    return (
        <>
            <h1>CARRITO</h1>
            <section>
            {
                cart.map(equipo => {
                    return (
                        <div key={equipo.id} style={{ width: '100%', display: "flex", justifyContent: 'space-around'}}>
                            <h3>{equipo.name}</h3>
                            <h4>Cantidad: {equipo.quantity}</h4>
                            <h4>Precio por unidad: ${equipo.price}</h4>
                            <h4>Subtotal: ${equipo.quantity * equipo.price}</h4>
                            <button onClick={() => removeItem(equipo.id)}>Remover</button>
                        </div>
                    )
                })
            }
            </section>
            <section>
                <h1>Total: ${total}</h1>
            </section>
            <section>
                <Link to='/checkout'>Checkout</Link>
            </section>
        </>
    )
}

export default CartView