import './Footer.css';
import { Link } from 'react-router-dom';


function Footer() {

  const curentYear = new Date().getFullYear();

  return (

    <footer className="footer">
      <div className="footer__container">
        <div className="footer__caption">Учебный проект Яндекс.Практикум х BeatFilm.</div>
        <div className="footer__wrap">
          <span className="footer__date">&copy;{curentYear}</span>
          <ul className="footer__list">
            <li className="footer__item">
              <Link to="https://practicum.yandex.ru" target="_blank" className="footer__link">Яндекс.Практикум</Link>
            </li>
            <li className="footer__item">
              <Link to="https://github.com/elenatroenko" target="_blank" className="footer__link">Github</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>

  )

}

export default Footer;