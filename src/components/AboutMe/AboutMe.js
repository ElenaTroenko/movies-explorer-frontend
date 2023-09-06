import './AboutMe.css';
import aboutMeFoto from '../../images/me.jpg';
import SectionTitle from '../SectionTitle/SectionTitle';
import { Link } from 'react-router-dom';


const AboutMe = () => {

  return (
    
    <section id="about_me" className="about-me">
      <div className="about-me__container">
        <SectionTitle title="Студент" />
        <div className="about-me__description">
          <div className="about-me__wrap">
            <h3 className="about-me__title">Елена</h3>
            <p className="about-me__subtitle">Фронтенд-разработчик, 37 лет</p>
            <p className="about-me__text">
              Я живу в Ростовской области. У меня техническое образование. 
              В настоящее время я начинающий специалист на должности фронтэнд-разработчика. 
              Увлекаюсь чтением зарубежной литературы, занимаюсь любительским бегом, состою в группе волонтеров.  
            </p>
            <Link to="https://github.com/elenatroenko" target="_blank" className="about-me__link">Github</Link>  
          </div>
          <img className="about-me__foto" src={aboutMeFoto} alt="Фото разработчика" />
        </div>
      </div>
    </section>

  )
}


export default AboutMe;