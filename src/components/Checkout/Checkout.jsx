import { useState } from "react";
import { collection, addDoc} from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConfig";
import { useCart } from "../../context/CartContext";

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [userData, setUserData] = useState({
        name: "",
        phone: "",
        email: ""
    });

    const { cart, total, clearCart } = useCart();

    const preventChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const createOrder = async () => {
        setLoading(true);
        try {
            const orderRef = await addDoc(collection(db, "orders"), {
                comprador: userData,
                items: cart,
                total,
            });
            setOrderId(orderRef.id);
            clearCart();
        } catch (error) {
            console.error("Error en la creación de la orden", error);
        } finally {
            setLoading(false);
        }
    };

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
                <button type="submit">Crear orden</button>
            </form>
        </div>
    );
};

export default Checkout