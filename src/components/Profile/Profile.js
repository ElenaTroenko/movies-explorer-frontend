import './Profile.css';
import { Link } from 'react-router-dom';

function Profile({logoutHandler}) {

  function handleLogout() {
    logoutHandler(false);
  }

  return (
    <main class="content">
      <div className="profile">
        <h2 className="profile-name">Привет, Виталий!</h2>
        <form className="profile__form" name="profile-form">
            <label className="profile__placeholder">
              Имя
              <input  className="profile__input profile__name" name="name" type="text" placeholder="" required></input>
            </label>
            <label className="profile__placeholder">
                E-mail
                <input  className="profile__input profile__email" name="email" type="email" placeholder="" required></input>
              </label>
          <button className="profile__edit">Редактировать</button>
          <Link onClick={handleLogout} to="/signin" className="profile__exit">Выйти из аккаунта</Link>
        </form>
      </div>
    </main>

  )

}

export default Profile;