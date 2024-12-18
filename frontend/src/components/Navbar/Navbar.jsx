import React, { useEffect, useState } from 'react';
import Search from '../Search/Searsh';
import Filter from '../Filter/Filter';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart , faBars, faTimes , faHeart } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth} from '../../hooks/useAuth';

function Navbar() {
  const [sideOpen, setSideOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const {user , loading } = useAuth();
  const location = useLocation(); 

  const checkScreenSize = () => {
    setIsMobile(window.innerWidth < 800);
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  const handleDetailsClick = () => {
    navigate(`/`); 
  };
  const handleLogin = () => {
    navigate(`/login`); 
  };
  const handleCart = () => {
    navigate(`/cart`); 
  };
  const handleFavourite = () => {
    navigate(`/favourite`); 
  };

  const sideBar = () => {
    setSideOpen(!sideOpen);
  };

  const handleProfile = () =>{
    navigate(`/profile/${localStorage.getItem("id")}`);
  }

  const hideFilter = location.pathname === '/admin' || location.pathname === '/login' || location.pathname === '/signup' || location.pathname.startsWith('/profile');

  return (
    <>
      <div className='container-nav'>

        { isMobile ? <>
          <div className='logo'>
            <img onClick={handleDetailsClick} style={{cursor : "pointer"}}
              src="https://i.ibb.co/W513SPR/logob.png"
              alt='Logo'
              />
          </div>

          <div className='search'>
            <Search />
          </div>

          <div className={`sidebar ${sideOpen ? 'open' : ''}`}>

            {loading ? 
              <div></div> : 
              <>
              {user ? 
                <>
                <img src = {`http://localhost:5000/${user.profilePhoto}`} alt="profilePhoto" style={{width : "20%"}}></img>
                <button className='button'onClick={handleProfile} >  Hi {user.username} !</button> 
                </>
              :
                <button className='button'onClick={handleLogin} >Login or Register</button> 
              }
              </>
            }

          <div className='Login'>
            <button className='button' onClick={handleCart}>
              <FontAwesomeIcon icon={faShoppingCart} size="1x" />
            </button> 
          <div className='Login'> 
          </div>
            <button className='button' onClick={handleFavourite}>
              <FontAwesomeIcon icon={faHeart} size="1x" />
            </button> 
          </div>
          <div className='filter'>
          <Filter />
        </div>

        </div>
        </>
              : 
            <>
          <div className='logo'>
            <img onClick={handleDetailsClick} style={{cursor : "pointer"}}
              src="https://i.ibb.co/W513SPR/logob.png"
              alt='Logo'
              />
          </div>
          <div className='search'>
            <Search />
          </div>
          <div className='Login'>
            {user ? 
            <button className='button'onClick={handleProfile} >  Hi {user.username} !</button> 
            :
            <button className='button'onClick={handleLogin} >Login or Register</button> 
            }
          </div>
            <span>|</span>
          <div className='Login'>
            <button className='button' onClick={handleCart}>
              <FontAwesomeIcon icon={faShoppingCart} size="1x" />
            </button> 
          </div>
            <span>|</span>
          <div className='Login'> 
            <button className='button' onClick={handleFavourite}>
              <FontAwesomeIcon icon={faHeart} size="1x" />
            </button> 
          </div>
          {!hideFilter && (
              <div className='filter'>
                <Filter />
              </div>
            )}
        </> 
        }
          
          <div className="hamburger" onClick={sideBar}>
            <FontAwesomeIcon icon={sideOpen ? faTimes : faBars} size="2x" color="white" />
          </div>
      </div>
    </>
  );
}

export default Navbar;
