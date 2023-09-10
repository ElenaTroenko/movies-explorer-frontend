import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import React from 'react';
import { LoadingContext } from "../../contexts/LoadingContext";


const Movies = ({ movies, onSearch, errorMsg, userOptions, onLike,
  onDislike }) => {
  // подписка на контекст LoadingContext
  const isLoading = React.useContext(LoadingContext);
  
  return (
    <>
      <SearchForm
        showOnlySaved={false}
        onSearch={onSearch}
        userOptions={userOptions}
      />
      {isLoading
      ? <Preloader showPreloader={true} />
      : <MoviesCardList
          movies={movies}
          showOnlySaved={false}
          onLike={onLike}
          onDislike={onDislike}
          errorMsg={errorMsg}
        />
      }
    </>
  )
}


export default Movies;