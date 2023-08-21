import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import React from 'react';
import { LoadingContext } from "../../contexts/LoadingContext";


function Movies({ movies, showHearts }) {
  // подписка на контекст LoadingContext
  const isLoading = React.useContext(LoadingContext);

  return (

    <>
      <SearchForm />
      {isLoading
        ? <Preloader showPreloader={true} />
        : <MoviesCardList movies={movies} showHearts={showHearts} />
        }
    </>

  )

}

export default Movies;