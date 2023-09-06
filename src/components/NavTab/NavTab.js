import './NavTab.css';
import { HashLink as Link } from 'react-router-hash-link';


const NavTab = () => {

  return (

    <nav className="nav-project">
      <ul className="nav-project__list">
        <li className="nav-project__item">
          <Link className="nav-project__link" to="#about_project">О проекте</Link>
        </li>
        <li className="nav-project__item">
          <Link className="nav-project__link" to="#techs">Технологии</Link>
        </li>
        <li className="nav-project__item">
          <Link className="nav-project__link" to="#about_me">Студент</Link>
        </li>
      </ul>
    </nav>

  )
}


export default NavTab;