import './Header.css';
import logo from '../../images/logo.svg';
import avatar from '../../images/icon__account.svg';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import { useLocation } from 'react-router-dom';
import { navLinks } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

function Header({loggedIn, useBlueColor}) {

  const location = useLocation();
  const headerClassName = useBlueColor ? "header header_color_blue" : "header"
  const navigate = useNavigate()

  function handleBurgerClick() {
    const headerBurgerMenu = document.querySelector('.header-burger-menu');
    headerBurgerMenu.classList.toggle('header-burger-menu_off');
  }

  function loginHandle() {
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
                <Link to="/Profile" className="header-account__link">Аккаунт</Link>
                <img  className="header-account__img" src={avatar} alt="Аватар" />
              </div>
              <div className="header-burger">
                <button className="header-burger__button" type="button" onClick={handleBurgerClick}></button>
                <div className="header-burger-menu header-burger-menu_off">
                  <div className="header-burger-menu__nav">
                    <button className="header-burger__close" type="button" onClick={handleBurgerClick}></button>
                    <ul className="header-burger-menu__list">
                      {navLinks.map((navLink) => {
                        return (
                          <li className="header-burger-menu__item">
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
                      <Link to="/Profile" className="header-burger__account-link" onClick={handleBurgerClick}>Аккаунт</Link>
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

};

export default Header;