import React, { useState } from 'react'
import {Link , useNavigate} from 'react-router-dom'
import './css/navbar.css';
import { Badge } from 'react-bootstrap';
import Modal from '../Modal';
import Cart from '../screen/Cart';
import { useCart } from './ContextReducer';

export default function Navbar() {

  let data = useCart();

  const [cartView , setCartView] = useState(false)
  
  const navigate = useNavigate()

  const [menuIcon , setMenuIcon] =  useState('bi bi-list')
  const [navExpanded , setNavExpanded] = useState(false)

  const menuIconChange = () => {
    menuIcon === "bi bi-list" ? setMenuIcon("bi-x-lg") : setMenuIcon('bi bi-list')
    setNavExpanded(!navExpanded)
  }

  const handleLogout = () =>{
    localStorage.removeItem('authToken');
    navigate('/')
  }

  return (
    <>
      <div className="navbar">
        <nav>
          <div className="logo">
            <h1>ShalaFood</h1>
          </div>
          <ul className={ navExpanded ? "menuShow":"menu"}>
            <li><Link to='/' className='active'><i className='bi bi-house'></i>Home</Link></li>
              {
                (localStorage.getItem('authToken')) ? <li><Link to='/yourOrders'><i className='icon bi bi-bag'></i>Orders</Link></li>:"" 
              }
              {
                (!localStorage.getItem('authToken')) ? 
                  <div className='conIcon'>
                    <li>
                      <Link to='/loginuser'><i className='icon bi bi-box-arrow-in-right'></i>Login</Link>
                    </li>
                    <li>
                      <Link to='/createuser'><i className='icon bi bi-person-add'></i>Sign up</Link>
                    </li>
                  </div> : <div className='conIcon'>
                    <li>
                      <Link to='/' onClick={()=>setCartView(true)} ><i className='icon bi bi-cart'></i> Cart <Badge pill bg="danger" >{data.length}</Badge>   </Link>
                    </li>
                    {cartView ? <Modal onClose={()=>setCartView(false)}><Cart/></Modal> :  null}
                    <li>
                      <Link onClick={handleLogout}><i className='icon bi bi-box-arrow-in-left'></i> Logout</Link>
                    </li>
                  </div>
              }
          </ul>
          <div className="menu-icon">
            <i className={menuIcon} onClick={menuIconChange}></i>
          </div>
        </nav>
      </div>
    </>
  )
}