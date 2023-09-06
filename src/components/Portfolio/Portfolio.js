import './Portfolio.css';
import aboutMeImage from '../../images/arrow.svg';
import { Link } from 'react-router-dom';


const Portfolio = () => {

  return (

    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list">
          <li className="portfolio__item">
            <Link className="portfolio__link" target="_blank" to="https://troenko.ru/index.html">Статичный сайт
              <img className="portfolio__image" src={aboutMeImage} alt="Ссылка" />
            </Link>
          </li>
          <li className="portfolio__item">
            <Link className="portfolio__link" target="_blank" to="https://elenatroenko.github.io/russian-travel/">Адаптивный сайт
              <img className="portfolio__image" src={aboutMeImage} alt="Ссылка" />
            </Link>
            </li>
          <li className="portfolio__item">
            <Link className="portfolio__link" target="_blank" to="https://elenatroenko.github.io/mesto/">Одностраничное приложение
              <img className="portfolio__image" src={aboutMeImage} alt="Ссылка" />
            </Link>
          </li>
        </ul>
      </div>
    </section>

  )
}


export default Portfolio;