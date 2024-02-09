import './NavBar.css'
import CartWidget from "../CartWidget/CartWidget"
import { NavLink, Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <nav>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Link to='/'><h1>iCompany</h1></Link>
            </div>
            <div style={{ width: '90vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <NavLink to={'/category/iPad'}>iPad</NavLink>
                <NavLink to={'/category/MacBook'}>MacBook</NavLink>
                <NavLink to={'/category/iPhone'}>iPhone</NavLink>
            </div>
            <CartWidget />
        </nav>
    )
}
export default NavBar