import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


function SavedMovies({ movies }) {
  
  return (

    <>
      <SearchForm />
      <MoviesCardList movies={movies} showOnlySaved={true}/>
    </>

  )
  
}

export default SavedMovies;