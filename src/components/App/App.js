import './App.css';
import React from 'react';
import { Route, Routes } from "react-router-dom";
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
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
import { useNavigate } from 'react-router-dom';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import { errorsOnSearch } from '../../utils/messages';
import { BASE_URLS } from '../../utils/constants';
import { Navigate } from 'react-router-dom';


const App = () => {
  // стэйты
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [currentUserOptions, setCurrentUserOptions] = React.useState({});
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [searchErrorMsg, setSearchErrorMsg] = React.useState('');
  const [savedSearchErrorMsg, setSavedSearchErrorMsg] = React.useState('');
  
  // хук useNavigate
  const navigate = useNavigate();
  
  // Жизненный цикл ***************************************
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
          setMovies(options.search.movies)

          setLoggedIn(true);
        }
      })
      .catch((err) => logMessage(err.message));
    }
  }, []);

  React.useEffect(() => {
    // усли есть логин пользователя - загрузить его 
    // сохраненный фильмы в стэйт. Иначе - загрузить []
    if (loggedIn) {
      mainApi.getMovies()
      .then((savedMoviesFromApi) => {
        setSavedMovies(savedMoviesFromApi);
      })
      .catch((err) => logMessage(err.message));
    } else {
      setSavedMovies([]);
    }
  }, [loggedIn])

  const handleLike = ({ image, country, director, 
    duration, description, nameEN, nameRU, thumbnail,
    trailerLink, year, id }) => {

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
    .then((newMovie) => {
      mainApi.getMovies()
      .then((newSavedMovies) => {
        setSavedMovies(newSavedMovies)
      })
    })
    .catch((err) => handleErrorRes(err))
  }

  const handleDislike = (movie, setterCallBack) => {
    // найти в коллекции (стэйт) сохраненный фильм по movieId, и взять его _id
    const savedMovie = savedMovies.filter((savedMovieElement) => savedMovieElement.movieId === movie.id)[0];
    const _id = savedMovie._id;

    mainApi.deleteMovie(_id)
    .then(() => {
      // setterCallBack(false);
      
      mainApi.getMovies()
      .then((newSavedMovies) => {
        setSavedMovies(newSavedMovies)
      })
    })
    .catch((err) => handleErrorRes(err))

  }

  const handleDelete = (movie, setterCallBack) => {
    const _id = movie._id;

    mainApi.deleteMovie(_id)
    .then(() => {
      // setterCallBack(false);
      
      mainApi.getMovies()
      .then((newSavedMovies) => {
        setSavedMovies(newSavedMovies)
      })
    })
    .catch((err) => handleErrorRes(err))

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
          setMovies(options.search.movies)
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
          errorCallBack: errorCallBack,
        })
      })
      .catch((err) => handleErrorRes(err))
    } catch {
      showMessage({
        message: err.message,
        type: 'error',
        errorCallBack: errorCallBack,
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
  const handleEdit = ({ name, email }, errorCallBack, okCallBack) => {
    setIsLoading(true);

    mainApi.updateUserInfo({name, email})
    .then((user) => {
      if (user) {
        setCurrentUser(user);
        okCallBack('Данные пользователя обновлены');
      }
    })
    .catch((err) => {
      try {
        err.then((error) => {
          (handleErrorRes(error, errorCallBack))
        })
        .catch((err) => handleErrorRes(err))
      } catch {
        const defaultErr = new Error('При обновлении профиля произошла ошибка');
        (handleErrorRes(defaultErr, errorCallBack))
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
  const saveUserOptions = () => {
    localStorage.setItem('userOptions', JSON.stringify(currentUserOptions));
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
        search: {
          search: '',
          movies: [],
          shortsOnly: false,
        },
        savedSearch: {
          search: '',
          movies: [],
          shortsOnly: false,
        },
      }
    }
    
    return options;    
  }

  // Показать сообщение и использовать redirect/сл. действие
  const showMessage = ({
    message,      // сообщение об ошибке
    redirectTo,   // адрес для редиректа после
    errorCallBack,       // коллбэк для отправки сообщения
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

  const handleSearch = ({ search, shortsOnly }) => {
    setIsLoading(true);
    setSearchErrorMsg('');

    moviesApi.getMovies()
    .then((moviesFromApi) => {
      if (moviesFromApi) {
        const filteredMovies = filterMovies(
          moviesFromApi, {search, shortsOnly}
        );
        // - после фильтрации -
        if (filteredMovies.length === 0) {
          setSearchErrorMsg(errorsOnSearch.NOT_FOUND_ERR);
          setMovies([]);
        } else {
          setMovies(filteredMovies);
        }
        
        // сохранить новый объект опций поиска для текущего пользователя
        const newUserOptions = currentUserOptions;
        newUserOptions['search']['shortsOnly'] = shortsOnly;
        newUserOptions['search']['search'] = search;
        newUserOptions['search']['movies'] = filteredMovies;
        setCurrentUserOptions(newUserOptions);
        saveUserOptions(currentUser.email);
      }
    })
    .catch(() => {
      setSearchErrorMsg(errorsOnSearch.LOAD_MOVIES_ERR);
    })
    .finally(() => {

      setIsLoading(false)
    })
  }

  const handleSavedSearch = ({ search, shortsOnly }) => {
    setIsLoading(true);
    setSavedSearchErrorMsg('');

    mainApi.getMovies()
    .then((moviesFromApi) => {
      if (moviesFromApi) {
        const filteredMovies = filterMovies(
          moviesFromApi, {search, shortsOnly}
        );
        // - после фильтрации -
        if (filteredMovies.length === 0) {
          setSavedSearchErrorMsg(errorsOnSearch.NOT_FOUND_ERR);
          setSavedMovies([]);
        } else {
          setSavedMovies(filteredMovies);
        }
        
        // сохранить новый объект опций поиска для текущего пользователя
        const newUserOptions = currentUserOptions;
        newUserOptions['savedSearch']['shortsOnly'] = shortsOnly;
        newUserOptions['savedSearch']['search'] = search;
        newUserOptions['savedSearch']['movies'] = filteredMovies;
        setCurrentUserOptions(newUserOptions);
        saveUserOptions(currentUser.email);
      }
    })
    .catch(() => {
      setSearchErrorMsg(errorsOnSearch.LOAD_MOVIES_ERR);
    })
    .finally(() => {
      setIsLoading(false)
    })
  }

  const filterMovies = (movies, { search, shortsOnly }) => {
    if (shortsOnly) {
      movies = movies.filter((movie) => {
        return movie.duration <= 40;
      })
    }
    movies = movies.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(search.toLowerCase())
        || movie.nameEN.toLowerCase().includes(search.toLowerCase())
      )
    })
    return movies;
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
                          movies={movies}
                          showOnlySaved={false}
                          onSearch={handleSearch}
                          errorMsg={searchErrorMsg}
                          userOptions={currentUserOptions}
                          savedMovies={savedMovies}
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
                      <Movies
                        savedMovies={savedMovies}
                        showOnlySaved={true}
                        onDislike={handleDelete}
                        userOptions={currentUserOptions}
                        movies={movies}
                        onSearch={handleSavedSearch}
                        errorMsg={savedSearchErrorMsg}
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
                        logoutHandler={handleUserExit}
                        onEdit={handleEdit}
                        {...props}
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
            <Route path="*" element={
              <Main>
                <NotFound />
              </Main>
            } />
          </Routes>
        </LoadingContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  )
}


export default App;