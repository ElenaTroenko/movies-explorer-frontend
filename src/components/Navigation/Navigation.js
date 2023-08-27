import './Navigation.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { navLinks } from '../../utils/constants';


function Navigation({ loggedIn }) {
  const location = useLocation();

  return (

    <nav className="navigation">
      { loggedIn &&
        <>
          {navLinks.slice(1,3).map((navLink) => {
            return (
              <Link
                to={navLink.link}
                className={navLink.link === location.pathname
                  ? "navigation__link navigation__link_active"
                  : "navigation__link"
                }
              >
                {navLink.text}
              </Link>
            )
          })}
        </>
      }
    </nav>

  )

}

export default Navigation;