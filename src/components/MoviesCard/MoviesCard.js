import './MoviesCard.css';
import React from 'react';
import { BASE_URLS } from '../../utils/constants';
import { durationToHuman } from '../../utils/durationToHuman';
import { Link } from 'react-router-dom';


const MoviesCard = ({ movie, showHearts, onLike, onDislike, inSaved }) => {

  // Стэйты
  const [saved, setSaved] = React.useState(inSaved);

  const imageSrc = movie.image.url
  ? `${BASE_URLS.moviesBaseUrl}${movie.image.url}`
  : movie.image

  const handleClick = () => {
    showHearts
    ? saved
      ? onDislike(movie, setSaved)
      : onLike(movie, setSaved)
    : onDislike(movie, setSaved)
  }
  
  return (

    <article className="card-movie__item">
      <Link to={movie.trailerLink} target='_blank'>
        <img 
          className="card-movie__img" src={imageSrc}
          alt={`Изображение фильма ${movie.nameRU}`}
        />
      </Link>
      <div className="card-movie__location">
        <h2 className="card-movie__title">{movie.nameRU}</h2>
        <button onClick={handleClick} className={
          showHearts
          ? saved
            ? "card-movie__button-heart_filled"
            : "card-movie__button-heart"
          : "card-movie__button-delete"
          } type="button"></button>
      </div>
      <div className="card-movie__time">{durationToHuman(movie.duration)}</div>
    </article>

  )
}


export default MoviesCard;