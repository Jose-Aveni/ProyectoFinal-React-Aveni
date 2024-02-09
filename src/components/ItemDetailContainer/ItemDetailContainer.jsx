import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ItemDetail from "../ItemDetail/ItemDetail"
import { db } from "../../services/firebase/firebaseConfig"
import { getDoc, doc } from "firebase/firestore"

const ItemDetailContainer = () => {
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState(null)

    const { productId } = useParams()

    useEffect(() => {
        setLoading(true)

        const productDocument = doc(db, 'equipos', productId)

        getDoc(productDocument)
            .then(queryDocumentSnapshot => {
                const fields = queryDocumentSnapshot.data()
                const productAdapted = { id: queryDocumentSnapshot.id, ...fields}
                setProduct(productAdapted)
            })
            .catch(error => {
                console.error(error, 'Hubo un error')
})
            .finally(() => {
                setLoading(false)
            })
    }, [productId])

    if(loading) {
        return <h1>Cargando el producto...</h1>
    }

    if(!product) {
        return <h1>El producto no existe</h1>
    }
    return (
        <div>
            <h1>Detalle</h1>
            <ItemDetail {...product} />
        </div>
    )
}

export default ItemDetailContainer