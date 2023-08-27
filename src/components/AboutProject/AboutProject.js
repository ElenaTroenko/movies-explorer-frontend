import './AboutProject.css';

function AboutProject() {

  return (

    <section id={"about_project"} className="about-project">
            <div className="about-project__container">
              <h2 className="section-title">О проекте</h2>
              <div className="about-project__description">
                <div className="about-project__description-container">
                  <div className="about-project__description-subtitle">Дипломный проект включал 5 этапов</div>
                  <div className="about-project__description-text">Составление плана, работу над бэкендом, 
                    вёрстку, добавление функциональности и финальные доработки.</div>
                </div>
                <div className="about-project__description-container">
                  <div className="about-project__description-subtitle">На выполнение диплома ушло 5 недель</div>
                  <div className="about-project__description-text">У каждого этапа был мягкий и жёсткий дедлайн, 
                    которые нужно было соблюдать, чтобы успешно защититься.</div>
                </div>
              </div>
              <div className="about-project-progress">
                <div className="about-project-progress__week about-project-progress__week_filled_green ">1 неделя</div>
                <div className="about-project-progress__month about-project-progress__month_filled_gray">4 недели</div>
              </div>
              <div className="about-project-progress">
                <div className="about-project-progress__week about-project-progress__week_text_gray">Back-end</div>
                <div className="about-project-progress__month about-project-progress__month_text_gray">Front-end</div>
              </div>
            </div>
    </section>

  )

}

export default AboutProject;