import './SearchForm.css';
import React from 'react';
import validateField from '../../utils/validateField';
import { errorsOnMovieSearchField } from '../../utils/messages';


const SearchForm = ({ onSearch, userOptions, showOnlySaved }) => {
  // стэйты
  const [searchError, setSearchError] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [shortsOnly, setShortsOnly] = React.useState(false);

  // Реф
  const shortsRef = React.useRef();

  React.useEffect(() => {
    // восстановить значения из опций пользователя
    if (userOptions && userOptions.search) {
      shortsRef.current.checked = !showOnlySaved
        ? userOptions.search.shortsOnly
        : userOptions.savedSearch.shortsOnly

      setShortsOnly(!showOnlySaved
        ? userOptions.search.shortsOnly
        : userOptions.savedSearch.shortsOnly
      )

      setSearch(!showOnlySaved
        ? userOptions.search.search
        : userOptions.savedSearch.search
      )
    }
  }, [])

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
    setShortsOnly(shortsRef.current.checked);
    onSearch({ search, shortsOnly: shortsRef.current.checked })
  }

  return (
    
    <section className="search" aria-label="поиск фильма">
      <div className="search__container">
        <form className="search-form" name="search-form" noValidate>
          <input onChange={handleChange} id="input-movie" className="search-input" type="text" name="movie"
            placeholder="Фильм" minLength="2" maxLength="40" required autoComplete="off" value={search}/>
          <button onClick={handleSubmit} className="search__btn" type="submit"></button>
        </form>
        <div className="validate-error">{searchError}</div>
        <div className="search__checkbox-container">
          <input onClick={handleShortsClick} ref={shortsRef} id="short-checkbox" type="checkbox" className="search__checkbox" name="short-film" />
          <label htmlFor="short-checkbox"></label>
          <span className="search__checkbox-text">Короткометражки</span>
        </div>
        <div className="search__border"></div>
      </div>
    </section>

  )
}


export default SearchForm;