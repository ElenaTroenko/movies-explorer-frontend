import './App.css';
import React from 'react';
import { Route, Routes } from "react-router-dom";
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { LoadingContext } from '../../contexts/LoadingContext';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import { errorsOnSearch } from '../../utils/messages';
import { BASE_URLS, SHORTS_DURATION } from '../../utils/constants';


const App = () => {
  const location = useLocation();

  // стэйты
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState({});
  const [currentUserOptions, setCurrentUserOptions] = React.useState({});
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState('');
  const [filteredSavedMovies, setFilteredSavedMovies] = React.useState('');
  const [lastSavedSearch, setLastSavedSearch] = React.useState({});
  const [searchErrorMsg, setSearchErrorMsg] = React.useState('');
  const [savedSearchErrorMsg, setSavedSearchErrorMsg] = React.useState('');
  const [registerErrorMsg, setRegisterErrorMsg] = React.useState('');
  const [registerOkMsg, setRegisterOkMsg] = React.useState('');

  // хук useNavigate
  const navigate = useNavigate();
  
  // Жизненный цикл
  React.useEffect(() => {
    let token = getUserToken();
    if (token) {
      mainApi.checkToken(token)
      .then((user) => {
        if (user) {
          setCurrentUser(user);
          // установить информацию об опциях пользователя и фильмах
          const options = getUserOptions();
          setCurrentUserOptions(options);

          setMovies(options.movies);
          setFilteredMovies(
            filterMovies(
              options.movies,
              {
                search: options.search.search,
                shortsOnly: options.search.shortsOnly,
              }
            )
          );
          setLoggedIn(true);
        }
      })
      .catch((err) => logMessage(err.message))
      .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);


  React.useEffect(() => {
    // усли есть логин пользователя - загрузить его 
    // сохраненный фильмы в стэйт. Иначе - загрузить []
    if (loggedIn) {
      mainApi.getMovies()
      .then((savedMoviesFromApi) => {
        setSavedMovies(savedMoviesFromApi);
        setFilteredSavedMovies(savedMoviesFromApi);
      })
      .catch((err) => logMessage(err.message));
    } else {
      setSavedMovies([]);
    }
  }, [loggedIn])

  React.useEffect(() => {
    if (location.pathname === '/saved-movies') {
      mainApi.getMovies()
      .then((savedMoviesFromApi) => {
        setSavedMovies(savedMoviesFromApi);
        setFilteredSavedMovies(savedMoviesFromApi);

        setLastSavedSearch({
          search: '',
          shortsOnly: false,
        })
      })
      .catch((err) => logMessage(err.message));
    }
  }, [location]);

  // хэндлер лайка 
  const handleLike = (movie, setterCallBack) => {
    const { image, country, director, 
      duration, description, nameEN, nameRU, thumbnail,
      trailerLink, year, id } = movie;

    const newMovie = {
      image: `${BASE_URLS.moviesBaseUrl}${image.url}`,
      country,
      director,
      duration,
      description,
      nameEN,
      nameRU,
      thumbnail: `${BASE_URLS.moviesBaseUrl}${image.previewUrl.split('\n'[0])}`,
      trailerLink,
      year,
      movieId: id,
    } 
  
    mainApi.createMovie(newMovie)
    .then((newMovieFromApi) => {

      // *** Изменение [movies] ***
      // установить свойство inSaved в элементе массива movies
      movie.inSaved = true
      // сохранить userOptions
      currentUserOptions['movies'] = movies;  // изменяем свойство
      saveUserOptions();                      // сохраняем изм. опции

      // *** Изменение [savedMmovies] ***
      // добавить в список сохр. фильмов новый (в стэйт)
      savedMovies.push(newMovieFromApi)

      setSavedSearchErrorMsg('');

      // установить сердечко в карточке
      setterCallBack(true);
    })
    .catch((err) => handleErrorRes(err))
  }

  const handleDislike = (movie, setterCallBack) => {
    // найти в коллекции (стэйт) сохраненный фильм по movieId, и взять его _id
    const savedMovie = savedMovies.filter((savedMovieElement) => savedMovieElement.movieId === movie.id)[0];
    const _id = savedMovie._id;

    mainApi.deleteMovie(_id)
    .then(() => {
      // *** Изменение [movies] ***
      // установить свойство inSaved
      movie.inSaved = false;
      // сохранить userOptions
      currentUserOptions['movies'] = movies;  // изменяем свойство
      saveUserOptions();                      // сохраняем изм. опции

      if (setterCallBack) {
        setterCallBack(false);
      }
     
    })
    .catch((err) => handleErrorRes(err))

  }

  const handleDelete = (movie) => {
    const _id = movie._id;
    const id = movie.movieId;

    mainApi.deleteMovie(_id)
    .then(() => {
      const newSavedMovies = savedMovies.filter(
        (savedMovieElement) => {
          return savedMovieElement.movieId !== id
        }
      )

        // *** Изменение [savedMovies] ***
        setSavedMovies(newSavedMovies)

        // *** Изменение [filteredSavedMovies] ***
        filterSavedMovies(newSavedMovies);
       
        // *** Изменение [movies] ***
        // установить свойство inSaved в элементе массива movies
        movies.filter((movieElement)=>movieElement.id === id)[0].inSaved = false
        // сохранить userOptions
        currentUserOptions['movies'] = movies;  // изменяем свойство
        saveUserOptions();                      // сохраняем изм. опции

        // *** Изменение [filteredMovies] ***
        setFilteredMovies(filterMovies(movies, {
          search: currentUserOptions.search.search,
          shortsOnly: currentUserOptions.search.shortsOnly,
        }))

    })
    .catch((err) => handleErrorRes(err))
  }

  const filterSavedMovies = (newSavedMovies) => {
    // отфильтровать
    const newFilteredSavedMovies = filterMovies(
      newSavedMovies ? newSavedMovies : savedMovies,
      { search: lastSavedSearch.search ? lastSavedSearch.search : '',
        shortsOnly: lastSavedSearch.shortsOnly ? lastSavedSearch.shortsOnly : false }
    )
    // - после фильтрации -
    if (newFilteredSavedMovies.length === 0 && lastSavedSearch.savedSearch) {
      setSavedSearchErrorMsg(errorsOnSearch.NOT_FOUND_ERR);
    } else {
      // *** Изменение [filteredSavedMovies] ***
      // сохраниеть отфильтрованные сохраненные фильмы
      setFilteredSavedMovies(newFilteredSavedMovies)
    }
  }

  // Хэндлер логина
  const handleLogin = ({ email, password }, errorCallBack) => {
    setIsLoading(true);

    mainApi.login({email, password})
    .then((data) => {
      if (data.token) {
        // сохранить токен
        saveUserToken(data.token);

        // установить заголовки API
        mainApi.addHeaders({ authorization: `Bearer ${data.token}` })

        // установить информацию о пользователе
        mainApi.getUserInfo()
        .then((user) => {
          setCurrentUser(user);
          // установить информацию об опциях пользователя и фильмах
          const options = getUserOptions();
          setCurrentUserOptions(options);
          setMovies(options.movies)
          setFilteredMovies(
            filterMovies(
              options.movies,
              {
                search: options.search.search,
                shortsOnly: options.search.shortsOnly,
              }
            )
          );
        })

        setLoggedIn(true);
        navigate('/movies');
      } 
    })
    .catch((err) => handleErrorRes(err, errorCallBack))
    .finally(() => {
      setIsLoading(false)
    });
  }

  // Хендлер ошибки (Res)
  const handleErrorRes = (err, errorCallBack) => {
    try {
      err.then((error) => {
        showMessage({
          message: error.message,
          type: 'error',
          errorCallBack: errorCallBack(error.message),
        })
      })
      .catch((err) => handleErrorRes(err))
    } catch {
      showMessage({
        message: err.message,
        type: 'error',
        errorCallBack: errorCallBack(err.message),
      })
    }
  }

  // хэндлер логоута
  const handleUserExit = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userOptions');
    setCurrentUser({});
    setLoggedIn(false);
    navigate('/');
  }

  // Хэндлер регистрации
  const handleRegister = ({ name, email, password }, errorCallBack) => {
    setIsLoading(true);

    mainApi.createUser({ name, email, password })
    .then((data) => {
      if (data.user && data.user._id) {
        handleLogin({
          email: data.user.email,
          password: password,
        });
        showMessage({
          message: 'Вы успешно зарегистрировались!',
          redirectTo: '/movies',
        });
      }
    })
    .catch((err) => handleErrorRes(err, errorCallBack))
    .finally(() => {
      setIsLoading(false);
    });
  }

  //Хэндлер редактирования профиля
  const handleEdit = (data) => {
    setIsLoading(true);

    setRegisterErrorMsg('');
    setRegisterOkMsg('');

    mainApi.updateUserInfo(data)
    .then((user) => {
      if (user) {
        setCurrentUser(user);
        setRegisterOkMsg('Данные пользователя обновлены');
      }
    })
    .catch((err) => {
      try {
        err.then((error) => {
          (handleErrorRes(error, setRegisterErrorMsg))
        })
        .catch((err) => handleErrorRes(err))
      } catch {
        const defaultErr = new Error('При обновлении профиля произошла ошибка');
        (handleErrorRes(defaultErr, setRegisterErrorMsg))
      }
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  // получить токен. Возвращает токен из localStorage
  const getUserToken = () => {
    return localStorage.getItem('userToken');
  }

  // Сохранить токен. Сохраняет токен в localStorage
  const saveUserToken = (token) => {
    localStorage.setItem('userToken', token);
  }

  // Сохранить опции пользователя в localStorage
  // (если переданы опции, то именно их. Если не переданы
  // - то сохранить стэйт uSerOptions)
  const saveUserOptions = (optionalUserOptions) => {
    if (optionalUserOptions) {
      localStorage.setItem('userOptions', JSON.stringify(optionalUserOptions));
    } else {
      localStorage.setItem('userOptions', JSON.stringify(currentUserOptions));
    }
  }

  // Восстанавливает опции пользователя из localStorage
  const getUserOptions = () => {
    let options = null;

    try {
      options = JSON.parse(localStorage.getItem('userOptions'));
    } catch {
      logMessage('Error in Local Storage')
    }

    if (!options) {
      options = {
        movies: [],
        savedMovies: [],
        search: {
          search: '',
          shortsOnly: false,
        },
        savedSearch: {
          search: '',
          shortsOnly: false,
        },
      }
    }
    
    return options;    
  }

  // Показать сообщение и использовать redirect/сл. действие
  const showMessage = ({
    message,        // сообщение об ошибке
    redirectTo,     // адрес для редиректа после
    errorCallBack,  // коллбэк для отправки сообщения
  }) => {

    if (!message) {
      message = 'Что-то пошло не так... Проверьте соединение с Интернет и попробуйте еще раз.'
    }

    if (errorCallBack) {
      errorCallBack(message);
    } else {
      logMessage(message);
    }

    if (redirectTo) {
      navigate(redirectTo);
    }
  }

  const logMessage = (message) => {
    if (!message) {
      message = 'Что-то пошло не так...'
    }
  }

  // хэндлер поиска по фильмам
  const handleSearch = ({ search, shortsOnly }) => {
    setIsLoading(true);

    setSearchErrorMsg('');

    // еcли фильмы еще не запрашивались с сервера (movies пуст)
    if (movies.length === 0) {
      setIsLoading(true);
      // запросить с сервера
      moviesApi.getMovies()
      .then((moviesFromApi) => {
        // модифицируем коллекцию фильмов (лайкнут|нет)
        const modifiedMovies = modifyMovies(moviesFromApi)

        // устанавливаем movies
        setMovies(modifiedMovies);

        const filteredMovies = filterMovies(modifiedMovies, { search, shortsOnly });
        saveSearch(filteredMovies, { search, shortsOnly }, modifiedMovies);
        
      })
      .catch(() => {
        setSearchErrorMsg(errorsOnSearch.LOAD_MOVIES_ERR);
      })
      .finally(() => {
        setIsLoading(false)
      })
    } else {
      // устанавливаем глобальный стэйт отфильтрованных фильмов
      saveSearch(filterMovies(movies, { search, shortsOnly }), { search, shortsOnly })
    }

    setIsLoading(false);
  }

  // сохраняет последний поисковый запрос фильмов, если он дал результат, 
  // устанавливает глобальный стэйт отфильтрованных фильмов 
  // или глобальный стэйт ошибки поиска
  const saveSearch = (newFilteredMovies, { search, shortsOnly }, newMovies) => {
    if (newFilteredMovies.length === 0) {
      setSearchErrorMsg(errorsOnSearch.NOT_FOUND_ERR);
    } else {
      setSearchErrorMsg('');
    }

    // установить глобальный стэйт фильмов
    setFilteredMovies(newFilteredMovies);
    // сохранить новый объект опций поиска для текущего пользователя
    const newUserOptions = currentUserOptions;
    newUserOptions['search']['shortsOnly'] = shortsOnly;
    newUserOptions['search']['search'] = search;
    newUserOptions['movies'] = newMovies? newMovies : movies;
    setCurrentUserOptions(newUserOptions);
    saveUserOptions(newUserOptions);
  }

  // изменяет каждый элемент (movie) переданного массива фильмов,
  // добавляя свойство inSaved (true|false)
  const modifyMovies = (originalMovies) => {
    const modifiedMovies = originalMovies;

    modifiedMovies.map((movieElement) => {
      const inSaved = savedMovies.filter((savedMovieElement) => {
        return movieElement.id === savedMovieElement.movieId
      }).length > 0;

      movieElement.inSaved = inSaved;
    })

    return modifiedMovies;
  }

  // хэндлер поиска по сохраненным фильмам
  const handleSavedSearch = ({ search = '', shortsOnly = false }) => {
    setSavedSearchErrorMsg('');

    // сохранить объект последнего запроса по сохраненным фильмам
    setLastSavedSearch({search, shortsOnly});

    const newFilteredSavedMovies = filterMovies(savedMovies, {search, shortsOnly})

    if (newFilteredSavedMovies.length === 0 && lastSavedSearch.savedSearch) {
      setSavedSearchErrorMsg(errorsOnSearch.NOT_FOUND_ERR);
    } else {
      // *** Изменение [filteredSavedMovies] ***
      // сохраниеть отфильтрованные сохраненные фильмы
      setFilteredSavedMovies(newFilteredSavedMovies)
    }
  }

  // принимает на вход массив фильмов и возвращает новый массив фильмов,
  // отфильтрованный по поисковой строке и параметру "короткометражки"
  const filterMovies = (moviesForFiltering, { search, shortsOnly }) => {
    // Определяем переменную для результата фильтрации
    let moviesResult = moviesForFiltering;

    // если нужно - фильтруем по короткометражкам
    if (shortsOnly) {
      moviesResult = moviesResult.filter((movieElement) => {
        return movieElement.duration <= SHORTS_DURATION;
      })
    }

    // фильтруем по вхождению поисковой строки в название (RU/EN)
    moviesResult = moviesResult.filter((movieElement) => {
      return (
        movieElement.nameRU.toLowerCase().includes(search.toLowerCase())
        || movieElement.nameEN.toLowerCase().includes(search.toLowerCase())
      )
    })

    return moviesResult;
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <LoadingContext.Provider value={isLoading}>
          <Routes>
            <Route path="/" element={
              <>
                <Header
                  loggedIn={loggedIn}
                  useBlueColor={true}/>
                <Main>
                  <Promo />
                  <NavTab />
                  <AboutProject />
                  <Techs />
                  <AboutMe />
                  <Portfolio />
                </Main>
                <Footer />
              </>
            } />
            <Route
              path="/movies"
              element={
                <ProtectedRoute 
                  element={({...props})=>
                    <>
                      <Header {...props} />
                      <Main>
                        <Movies
                          movies={filteredMovies}
                          onSearch={handleSearch}
                          errorMsg={searchErrorMsg}
                          userOptions={currentUserOptions}
                          onLike={handleLike}
                          onDislike={handleDislike}
                        />
                      </Main>
                      <Footer />
                    </>
                  }
                  loggedIn={loggedIn} />
            } />
            <Route path="/saved-movies" element={
              <ProtectedRoute
                element={({...props})=>
                  <>
                    <Header {...props} />
                    <Main>
                      <SavedMovies
                        movies={filteredSavedMovies}
                        onDislike={handleDelete}
                        userOptions={currentUserOptions}
                        onSearch={handleSavedSearch}
                        errorMsg={savedSearchErrorMsg}
                        lastSavedSearch={lastSavedSearch}
                      />
                    </Main>
                    <Footer />
                  </>
                }
                loggedIn={loggedIn} />
            } />
            <Route path="/profile" element={
              <ProtectedRoute
                element={({...props})=>
                  <>
                    <Header {...props} />
                    <Main>
                      <Profile
                        onSignOut ={handleUserExit}
                        onEdit={handleEdit}
                        errorMsg={registerErrorMsg}
                        okMsg={registerOkMsg}
                      />
                    </Main>
                  </>
                }
                loggedIn={loggedIn}
                />
            } />
            <Route path="/signup" element={
              loggedIn
              ? <Navigate to="/" replace />
              : <Main>
                  <Register onRegister={handleRegister} />
                </Main>
            } />
            <Route path="/signin" element={
              loggedIn
              ? <Navigate to="/" replace />
              : <Main>
                  <Login
                    onLogin={handleLogin}
                  />
                </Main>
            } />
            <Route path='/404' element={
              <Main>
                <NotFound />
              </Main>
            } />
            <Route path="*" element={
              <Navigate to='/404' replace={true}/>
            } />
          </Routes>
        </LoadingContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  )
}


export default App;