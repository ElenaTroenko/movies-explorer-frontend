import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import React from 'react';
import { SCREEN_RULES } from '../../utils/constants';


const MoviesCardList = ({ showOnlySaved, movies, onLike, onDislike, savedMovies, errorMsg }) => {
  // стэйты
  const [currentScreenWidth, setCurrentScreenWidth] = React.useState(0);
  const [addedCardsQuantity, setAddedCardsQuantity] = React.useState(0);
  const [cardsQuantity, setCardsQuantity] = React.useState(0);
  const [btnMoreClassName, setBtnMoreClassName] = React.useState("card-movie__more-btn");
  const [boxMoreClassName, setBoxMoreClassName] = React.useState("card-movie__box card-movie__box_off");

  React.useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);
    return function exit() {
      window.removeEventListener('resize', handleResize);
    }
  }, [])
  
  React.useEffect(() => {
    // Определить добавляемое количество карточек,
    // исходя из ширины окна
    if (currentScreenWidth > SCREEN_RULES.MEDIUM.width) {
      setCardsQuantity(SCREEN_RULES.FULL.cards);
      setAddedCardsQuantity(SCREEN_RULES.FULL.addedCards);
    } else if (currentScreenWidth > SCREEN_RULES.SMALL.width) {
      setCardsQuantity(SCREEN_RULES.MEDIUM.cards);
      setAddedCardsQuantity(SCREEN_RULES.MEDIUM.addedCards);
    } else {
      setCardsQuantity(SCREEN_RULES.SMALL.cards);
      setAddedCardsQuantity(SCREEN_RULES.SMALL.addedCards);
    }
  }, [currentScreenWidth])
  
  // жизненный цикл (определить необходимость отображения
  // кнопки "еще"
  React.useEffect(() => {
    if (cardsQuantity >= movies.length || showOnlySaved) {
      setBtnMoreClassName("card-movie__more-btn card-movie__more-btn_off");
      setBoxMoreClassName("card-movie__box");
    }
  }, [cardsQuantity]);

  const handleResize = () => {
    window.removeEventListener('resize', handleResize);
    setCurrentScreenWidth(window.innerWidth);

    setTimeout(() => {
      window.addEventListener('resize', handleResize);
    }, 100)
  }

  // хэндлер кнопки "еще"
  const hendleMore = () => {
    setCardsQuantity(cardsQuantity + addedCardsQuantity);
  }
  
  if (showOnlySaved && errorMsg) {
    return (
      <div className="movies__empty">{errorMsg}</div>
    )
  }

  if (!showOnlySaved && errorMsg) {
    return (
      <div className="movies__empty">{errorMsg}</div>
    )
  }

  return (

    <section className="card-movie" aria-label="карточки с фильмами">
      <div className="card-movie__inner">
        {showOnlySaved
        ? savedMovies && savedMovies.map((savedMovie) => {
          return (
            <MoviesCard 
              movie={savedMovie}
              showHearts={false}
              key={savedMovie.movieId}
              onDislike={onDislike}
            />
          )
        })
        : movies && movies.slice(0, cardsQuantity).map((movie) => { 
          const inSaved = savedMovies.filter((savedMovieElement) => {
              return savedMovieElement.movieId === movie.id
          }).length > 0
          return (
            <MoviesCard 
              movie={movie}
              showHearts={true}
              key={movie.id}
              onLike={onLike}
              onDislike={onDislike}
              inSaved={inSaved}
            />
            )
          })
        }
      </div>
      <div className="card-movie__container">
        <button className={btnMoreClassName} onClick={hendleMore}>Ещё</button>
        <div className={boxMoreClassName}></div>
      </div>
    </section>

  )
}


export default MoviesCardList;