import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import React from 'react';
import {screenWidth, addedCardsQuantity} from '../../utils/constants';


function MoviesCardList({ movies, showOnlySaved, showHearts }) {
  const curentnWidth = window.innerWidth;
  
  let columnsQuantity;

  // Определить добавляемое количество карточек,
  // исходя из ширины окна
  if (curentnWidth >= screenWidth.MEDIUM) {
    columnsQuantity = addedCardsQuantity.THREE_COLUMNS;
  } else {
    columnsQuantity = addedCardsQuantity.TWO_COLUMNS;
  } 

  const [cardsQuantity, setCardsQuantity] = React.useState(columnsQuantity);
  const [btnMoreClassName, setBtnMoreClassName] = React.useState("card-movie__more-btn");
  const [boxMoreClassName, setBoxMoreClassName] = React.useState("card-movie__box card-movie__box_off");
    
  // жизненный цикл (определить необходимость отображения
  // кнопки "еще"
  React.useEffect(() => {
    if (cardsQuantity >= movies.length) {
      setBtnMoreClassName("card-movie__more-btn card-movie__more-btn_off");
      setBoxMoreClassName("card-movie__box");
    }
  }, [cardsQuantity, movies.length]);


  // хэндлер кнопки "еще"
  const hendleMore = () => {
    setCardsQuantity(cardsQuantity + columnsQuantity);
  }
  
  // применить фильтр только сохраненных фильтров,
  // если это требуется (булево в пропсе)
  if (showOnlySaved) {
    movies = movies.filter((movie) => movie.saved)
  }

  return (

    <section className="card-movie" aria-label="карточки с фильмами">
      <div className="card-movie__inner">

        {movies.slice(0, cardsQuantity).map((movie) => { 
          return (
            <MoviesCard 
              movie={movie}
              showHearts={showHearts}
            />
          )
        })}

      </div>
      <div className="card-movie__container">
        <button className={btnMoreClassName} onClick={hendleMore}>Ещё</button>
        <div className={boxMoreClassName}></div>
      </div>
    </section>

  )

}

export default MoviesCardList;