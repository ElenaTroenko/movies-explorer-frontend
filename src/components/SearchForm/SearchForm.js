import './SearchForm.css';

function SearchForm() {

  return (
    
    <section className="search" aria-label="поиск фильма">
      <div className="search__container">
        <form className="search-form" name="search-form" novalidate>
          <input id="input-movie" className="search-input" type="text" name="movie"
            placeholder="Фильм" minlength="2" maxlength="40" required autocomplete="off" />
          <button className="search__btn" type="submit"></button>
        </form>

        <div className="search__checkbox-container">
          <input id="short-checkbox" type="checkbox" className="search__checkbox" name="short-film" />
          <label for="short-checkbox"></label>
          <span className="search__checkbox-text">Короткометражки</span>
        </div>

        <div className="search__border"></div>
      </div>
    </section>

  )
}

export default SearchForm;