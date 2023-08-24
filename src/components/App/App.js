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
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';

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
          <Route path="/movies" element={
            <>
              <Header loggedIn={loggedIn} />
              <Main>
                <Movies
                movies={movies}
                showHearts={true}
                />
              </Main>
              <Footer />
            </>
          } />
          <Route path="/saved-movies" element={
            <>
              <Header loggedIn={loggedIn} />
              <Main>
                <SavedMovies movies={movies} showHearts={false} />
              </Main>
              <Footer />
            </>
          } />
          <Route path="/profile" element={
            <>
              <Header loggedIn={loggedIn} />
              <Main>
                <Profile logoutHandler={setLoggedIn} />
              </Main>
            </>
          } />
          <Route path="/signup" element={
            <Main>
              <Register />
            </Main>
          } />
          <Route path="/signin" element={
            <Main>
              <Login />
            </Main>
          } />
          <Route path="*" element={
            <Main>
              <NotFound />
            </Main>
          } />
        
        </Routes>
      </LoadingContext.Provider>
    </div>
  );

}

export default App;