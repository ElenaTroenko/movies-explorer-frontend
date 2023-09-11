import './SearchForm.css';
import React from 'react';
import validateField from '../../utils/validateField';
import { errorsOnMovieSearchField } from '../../utils/messages';
import { LoadingContext } from '../../contexts/LoadingContext';


const SearchForm = ({ onSearch, userOptions, showOnlySaved, lastSavedSearch }) => {
  // стэйты
  const [searchError, setSearchError] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [shortsOnly, setShortsOnly] = React.useState(false);

  // подписка на контекст isLoading
  const isLoading = React.useContext(LoadingContext);

  // Реф
  const shortsRef = React.useRef();

  React.useEffect(() => {
    // восстановить значения из опций пользователя
    // если это список фильмов, а не сохраненных фильмов
    if (userOptions && userOptions.search && !showOnlySaved) {
      shortsRef.current.checked = userOptions.search.shortsOnly
      setShortsOnly(userOptions.search.shortsOnly)
      setSearch(userOptions.search.search)
    }

    // данные поиска в сохраненных фильмах
    if (showOnlySaved && lastSavedSearch) {
      shortsRef.current.checked = lastSavedSearch.shortsOnly
      setShortsOnly(lastSavedSearch.shortsOnly)
      setSearch(lastSavedSearch.search)
    }
  }, [userOptions.search, userOptions.shortsOnly])


  // хэндлер сабмита
  const handleSubmit = (e) => {
    e.preventDefault();  // не перегружать страницу

    const validateSearch = validateField(
      search,
      {required: true},
      errorsOnMovieSearchField,
    );

    if (!validateSearch.fieldIsValid) {
      setSearchError(validateSearch.errorMessage)
    }

    validateSearch.fieldIsValid && onSearch({ search, shortsOnly });
  }


  // хэндлер изменений инпута
  const handleChange = (e) => {
    const {name, value} = e.target;

    setSearchError('');
    setSearch(value);
  }

  // хэндлер клика по короткометражкам
  const handleShortsClick = () => {
    if (showOnlySaved || search) {
      onSearch({ search, shortsOnly: shortsRef.current.checked })
    } else {
      // установить состояние чекбокса короткометражек
      setShortsOnly(shortsRef.current.checked);
    }
  }

  return (
    
    <section className="search" aria-label="поиск фильма">
      <div className="search__container">
        <form className="search-form" name="search-form" noValidate>
          <input onChange={handleChange} id="input-movie" className="search-input" type="text" name="movie"
            placeholder="Фильм" minLength="2" maxLength="40" required autoComplete="off" value={search || ''} disabled={isLoading} />
          <button onClick={handleSubmit} className="search__btn" type="submit" disabled={isLoading}></button>
        </form>
        <div className="validate-error">{searchError}</div>
        <div className="search__checkbox-container">
          <input onClick={handleShortsClick} ref={shortsRef} id="short-checkbox" type="checkbox" className="search__checkbox"
            name="short-film" disabled={isLoading} value={shortsOnly} />
          <label htmlFor="short-checkbox"></label>
          <span className="search__checkbox-text">Короткометражки</span>
        </div>
        <div className="search__border"></div>
      </div>
    </section>

  )
}


export default SearchForm;