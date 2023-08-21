import './Portfolio.css';
import aboutMeImage from '../../images/arrow.svg';


function Portfolio() {

  return (

    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list">
          <li className="portfolio__item">Статичный сайт
            <img className="portfolio__image" src={aboutMeImage} alt="Ссылка" />
          </li>
          <li className="portfolio__item">Адаптивный сайт
            <img className="portfolio__image" src={aboutMeImage} alt="Ссылка" />
          </li>
          <li className="portfolio__item">Одностраничное приложение
            <img className="portfolio__image" src={aboutMeImage} alt="Ссылка" />
          </li>
        </ul>
      </div>
    </section>

  )

}

export default Portfolio;