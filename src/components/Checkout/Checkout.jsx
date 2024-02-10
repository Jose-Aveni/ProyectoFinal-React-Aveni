import { useState } from "react";
import { collection, getDocs, where, query, documentId, writeBatch, addDoc } from "firebase/firestore"
import { db } from "../../services/firebase/firebaseConfig";
import { useCart } from "../../context/CartContext";

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [userData, setUserData] = useState({
        name: "",
        lastName: "",
        phone: "",
        email: "",
        confirmEmail: ""
    });

    const { cart, total, clearCart } = useCart();
    

    const preventChange = (e) => {
        const { name, value } = e.target;
        
        if (name === "phone" && !/^\d+$/.test(value)) {
            return;
        }

        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const createOrder = async () => {
        setLoading(true);
        try {
            if (cart.length === 0) {
                console.error("No hay artículos en el carrito");
                return;
            }
    
            const batch = writeBatch(db);
            const outOfStock = [];
            const ids = cart.map(prod => prod.id);
            const productsCollection = query(collection(db, 'equipos'), where(documentId(), 'in', ids));
            const querySnapshot = await getDocs(productsCollection);
            const { docs } = querySnapshot;
    
            docs.forEach(doc => {
                const fields = doc.data();
                const stockDb = fields.stock;
                const productAddedToCart = cart.find(prod => prod.id === doc.id);
                const prodQuantity = productAddedToCart.quantity;
    
                if (stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity });
                } else {
                    outOfStock.push({ id: doc.id, ...fields });
                }
            });
    
            if (outOfStock.length === 0) {
                await batch.commit();
    
                const orderRef = await addDoc(collection(db, "orders"), {
                    comprador: userData,
                    items: cart,
                    total,
                });
                setOrderId(orderRef.id); 
                clearCart(); 
            } else {
                console.error('error', 'Hay productos que no tienen stock disponible');
            }
        } catch (error) {
            console.error("Error en la creación de la orden", error);
        } finally {
            setLoading(false);
        }
    };
    

    const isEmailValid = userData.email === userData.confirmEmail;

    if (loading) {
        return <h1>Se está generando su orden, espere por favor...</h1>;
    }

    if (orderId) {
        return <h1>El ID de su compra es: {orderId}</h1>;
    }

    return (
        <div>
            <h1>CHECKOUT</h1>
            <form onSubmit={createOrder}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={preventChange}
                    />
                </div>
                <div>
                    <label>Apellido:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={userData.lastName}
                        onChange={preventChange}
                    />
                </div>
                <div>
                    <label>Número de teléfono:</label>
                    <input
                        type="text"
                        name="phone"
                        value={userData.phone}
                        onChange={preventChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={preventChange}
                    />
                </div>
                <div>
                    <label>Confirmar Email:</label>
                    <input
                        type="email"
                        name="confirmEmail"
                        value={userData.confirmEmail}
                        onChange={preventChange}
                    />
                    {!isEmailValid && <p>Los correos electrónicos no coinciden</p>}
                </div>
                <button type="submit" disabled={!isEmailValid}>Crear orden</button>
            </form>
        </div>
    );
};

export default Checkout;