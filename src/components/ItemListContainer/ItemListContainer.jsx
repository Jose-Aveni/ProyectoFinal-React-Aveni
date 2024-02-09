import { useState, useEffect } from "react"
import ItemList from "../ItemList/ItemList"
import { useParams } from "react-router-dom"
import { db } from "../../services/firebase/firebaseConfig"
import { getDocs, collection, query, where } from "firebase/firestore"

const ItemListContainer = ({ greeting }) => {
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])

    const { categoryId } = useParams()

    useEffect(() => {
        setLoading(true)
        
        const productsCollection = categoryId 
            ? query(collection(db, 'equipos'), where('category', '==', categoryId))
            : collection(db, 'equipos')

        getDocs(productsCollection)
            .then(querySnapshot => {
                const productsAdapted = querySnapshot.docs.map(doc => {
                    const fields = doc.data()
                    return { id: doc.id, ...fields}
                })
                setProducts(productsAdapted)
            })
            .catch(error => {
                console.error('error', 'Hubo un error')
            })
            .finally(() => {
                setLoading(false)
            })
    }, [categoryId])

    if(loading) {
        return <h1>Cargando los productos...</h1>
    }

    return (
        <div>
            <h1>{greeting + (categoryId ?? '')}</h1>
            <ItemList equipos={products}/>
        </div>
    )
}

export default ItemListContainer