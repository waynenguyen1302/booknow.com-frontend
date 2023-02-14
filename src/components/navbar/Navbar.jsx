import React, { useContext } from 'react'
import './navbar.css'
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import { useLogout } from '../../hooks/useLogout';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {logout} = useLogout()


  const handleLogin = () => {
    navigate("/login");
  }

  const handleLogout = () => {
    logout()
  }

  const handleRegister = () => {
    navigate("/register")
  }


  return (
    <div className="navbar">
        <div className="navContainer">
            <Link to="/" style={{color:"white", textDecoration:"none"}}>
              <span className='logo'>Booknow.com</span>
            </Link>       
                
            {user ? 
            <div className="logout">
              <p>Logged in as {user.username}</p>
              <button className="logoutBtn" onClick={handleLogout}>Logout</button>    
            </div>                     
            :             
            <div className="navItems">
                <button className="navButton" onClick = {handleRegister}>Register</button>
                <button className="navButton" onClick={handleLogin}>Login</button>
            </div>}
        </div>
    </div>
    
  )
}

export default Navbar