import './Navigation.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../../utils/constants';


const Navigation = ({ loggedIn }) => {
  const location = useLocation();

  return (

    <nav className="navigation">
      { loggedIn &&
        <>
          {NAV_LINKS.slice(1,3).map((navLink) => {
            return (
              <Link
                key={navLink.text}
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