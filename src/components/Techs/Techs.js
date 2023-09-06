import './Techs.css';

const Techs = () => {

  return (

    <section id="techs" className="technology">
      <div className="technology__container">
        <h2 className="section-title">Технологии</h2>
        <h3 className="technology__title">7 технологий</h3>
        <p className="technology__text">
          На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые применили в дипломном проекте.
          </p>
        <ul className="technology__list">
          <li className="technology__item">HTML</li>
          <li className="technology__item">CSS</li>
          <li className="technology__item">JS</li>
          <li className="technology__item">React</li>
          <li className="technology__item">Git</li>
          <li className="technology__item">Express.js</li>
          <li className="technology__item">mongoDB</li>
          <li className="technology__item technology__item_empty"></li>
          <li className="technology__item technology__item_empty"></li>
        </ul>  
      </div>
    </section>

  )
}


export default Techs;