import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import NavBar from './components/NavBar/NavBar'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import CartView from './components/CartView/CartView'
import Checkout from './components/Checkout/Checkout'


function App() {
  return (
    <>
       <BrowserRouter>
            <CartProvider>
              <NavBar />
              <Routes>
                <Route path='/' element={<ItemListContainer greeting={'Todos los equipos:'}/>}/>
                <Route path='/category/:categoryId' element={<ItemListContainer greeting={'Equipo filtrado: '}/>}/>
                <Route path='/detail/:productId' element={<ItemDetailContainer />} />
                <Route path='/cart' element={<CartView />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='*' element={<h1>ERROR 404</h1>} />
              </Routes>
            </CartProvider>
      </BrowserRouter>
    </>
  )
}

export default App