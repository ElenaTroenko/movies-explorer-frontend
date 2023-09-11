import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import React from 'react';
import { LoadingContext } from "../../contexts/LoadingContext";


const Movies = ({ onSearch, errorMsg, userOptions, 
  onDislike, movies, lastSavedSearch }) => {
  // подписка на контекст LoadingContext
  const isLoading = React.useContext(LoadingContext);

  return (
    <>
      <SearchForm
        showOnlySaved={true}
        onSearch={onSearch}
        userOptions={userOptions}
        lastSavedSearch={lastSavedSearch}
      />
      {isLoading
      ? <Preloader showPreloader={true} />
      : <MoviesCardList
          movies={movies}
          showOnlySaved={true}
          onDislike={onDislike}
          errorMsg={errorMsg}
        />
      }
    </>
  )
}


export default Movies;