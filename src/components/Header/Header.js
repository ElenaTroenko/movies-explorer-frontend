import './Header.css';
import React from 'react';
import logo from '../../images/logo.svg';
import avatar from '../../images/icon__account.svg';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import { useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


const Header = ({ loggedIn, useBlueColor }) => {
  // подписка на контекст LoadingContext
  const currentUser = React.useContext(CurrentUserContext);

  const location = useLocation();
  const headerClassName = useBlueColor ? "header header_color_blue" : "header"
  const navigate = useNavigate()

  const handleBurgerClick = () => {
    const headerBurgerMenu = document.querySelector('.header-burger-menu');
    headerBurgerMenu.classList.toggle('header-burger-menu_off');
  }

  const loginHandle = () => {
    navigate('/signin');
  }

  return (

    <header className={headerClassName}>
      <div className="header__container">
        <Link to="/" className="link-home">
          <img  className="header__logo" src={logo} alt="Логотип" />
        </Link>
        <div className="header__inner">
          <Navigation loggedIn={loggedIn} />
          { loggedIn
          ? <>
              <div id="account" className="header-account">
                <Link to="/Profile" className="header-account__link">{currentUser.name}</Link>
                <img  className="header-account__img" src={avatar} alt="Аватар" />
              </div>
              <div className="header-burger">
                <button className="header-burger__button" type="button" onClick={handleBurgerClick}></button>
                <div className="header-burger-menu header-burger-menu_off">
                  <div className="header-burger-menu__nav">
                    <button className="header-burger__close" type="button" onClick={handleBurgerClick}></button>
                    <ul className="header-burger-menu__list">
                      {NAV_LINKS.map((navLink) => {
                        return (
                          <li key={navLink.text} className="header-burger-menu__item">
                            <Link
                              className={
                                navLink.link === location.pathname
                                ? "header-burger-menu__link header-burger-menu__link_active"
                                : "header-burger-menu__link"
                              }
                              to={navLink.link}
                              onClick={handleBurgerClick}
                            >
                              {navLink.text}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                    <div className="header-burger__account" >
                      <Link to="/Profile" className="header-burger__account-link" onClick={handleBurgerClick}>{currentUser.name}</Link>
                      <img  className="header-burger__account-img" src={avatar} alt="Аватар" />
                    </div>
                  </div>
                </div>
              </div>
            </>
          : <div className="header-login">
              <Link to="/signup" className="header-login__link">Регистрация</Link>
              <button className="header-login__btn" type="button" onClick={loginHandle}>Войти</button>
            </div>
          }
        </div>
      </div>
    </header>
    
  )
}


export default Header;