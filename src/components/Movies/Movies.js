import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import React from 'react';
import { LoadingContext } from "../../contexts/LoadingContext";


const Movies = ({ movies, showOnlySaved, onSearch, errorMsg, userOptions, onLike, onDislike, savedMovies }) => {
  // подписка на контекст LoadingContext
  const isLoading = React.useContext(LoadingContext);

  return (
    <>
      <SearchForm
        showOnlySaved={showOnlySaved}
        onSearch={onSearch}
        userOptions={userOptions}
      />
      {isLoading
      ? <Preloader showPreloader={true} />
      : <MoviesCardList
          movies={movies}
          showOnlySaved={showOnlySaved}
          onLike={onLike}
          onDislike={onDislike}
          savedMovies={savedMovies}
          errorMsg={errorMsg}
        />
      }
    </>
  )
}


export default Movies;