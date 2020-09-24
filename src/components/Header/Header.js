import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import './Header.css';
import { useContext } from 'react';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser]= useContext(UserContext)
    return (
        <div className="header">
           <img src={logo} alt=""/>
           <nav>
               
               <Link to="/shop">Shop</Link>
               <Link to="/review">Order review</Link>
               <Link to="/inventory">Mange Order</Link>
               <span style={{color: 'gold'}}>{loggedInUser.name}</span>
               {
                   loggedInUser.success &&  <button onClick={() => setLoggedInUser({})}>Sign Out</button>

               }
           </nav>
        </div>
    );
};

export default Header;