import './MoviesCard.css';


function MoviesCard({ movie, showHearts }) {

  const buttonHeartClassName = showHearts
    ? (movie.saved ? "card-movie__button-heart_filled" : "card-movie__button-heart")
    : "card-movie__button-delete"

  return (

    <article className="card-movie__item">
      <img className="card-movie__img" src={movie.image}
        alt={`Изображение фильма ${movie.title}`} />
        <div className="card-movie__location">
          <h2 className="card-movie__title">{movie.title}</h2>
          <button className={buttonHeartClassName} type="button"></button>
        </div>
        <div className="card-movie__time">{movie.duration}</div>
    </article>

  )

}

export default MoviesCard;