import { useState  } from 'react'
import { Link } from 'react-router-dom'
import ItemCount from '../ItemCount/ItemCount'
import { useCart } from '../../context/CartContext'

const ItemDetail = ({ id, name, category, img, price, stock, description }) => {
    const [quantity, setQuantity] = useState(0)

    const { addItem } = useCart()


    const handleOnAdd = (quantity) => {
        const objProductToAdd = {
            id, name, price, quantity
        }
        addItem(objProductToAdd)
        console.log('info', `Se agregaron correctamente ${quantity} ${name}`)
        setQuantity(quantity)
    }

    return (
        <article>
            <header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <h2>
                    {name}
                </h2>
            </header>
            <picture style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img src={img} alt={name} style={{ width: 300}}/>
            </picture>
            <section style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <p>
                    Categoria: {category}
                </p>
                <p>
                    Descripción: {description}
                </p>
                <p>
                    Precio: {price}
                </p>
            </section>           
            <footer style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {
                    quantity === 0 ? (
                        <ItemCount onAdd={handleOnAdd} stock={stock} initial={quantity}/>
                    ) : (
                        <Link to='/cart'>Finalizar compra</Link>
                    )
                }
            </footer>
        </article>
    )
}

export default ItemDetail