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
import { LoadingContext } from '../../contexts/LoadingContext';
import { movies } from '../../utils/constants';
import './App.css';


function App() {

  const [loggedIn, setLoggedIn] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  
  // ЗАГЛУШКА *****************************
  // ДО СОВМЕЩЕНИЯ С БЭКЕНДОМ *************
  React.useEffect(() => {
   setLoggedIn(true);
   setIsLoading(false);
  }, []);
  //***************************************

  return (
    <div className="page">
      <LoadingContext.Provider value={isLoading}>
        <Routes>
          <Route path="/" element={
            <>
              <Header
                loggedIn={loggedIn}
                useBlueColor={true}/>
              <Main />
              <Footer />
            </>
          } />
          <Route path="/movies" element={
            <>
              <Header loggedIn={loggedIn} />
              <Movies
                movies={movies}
                showHearts={true}
              />
              <Footer />
            </>
          } />
          <Route path="/saved-movies" element={
            <>
              <Header loggedIn={loggedIn} />
              <SavedMovies movies={movies} showHearts={false} />
              <Footer />
            </>
          } />
          <Route path="/profile" element={
            <>
              <Header loggedIn={loggedIn} />
              <Profile logoutHandler={setLoggedIn} />
              <Footer />
            </>
          } />
          <Route path="/signup" element={
            <>
              <Register />
            </>
          } />
          <Route path="/signin" element={
            <>
              <Login />
            </>
          } />
          <Route path="*" element={
            <>
              <NotFound />
            </>
          } />
          

        </Routes>
      </LoadingContext.Provider>
    </div>
  );

}

export default App;