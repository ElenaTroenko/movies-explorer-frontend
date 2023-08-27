import './Login.css';
import logo from '../../images/logo.svg';
import { Link } from "react-router-dom";


function Login() {

  return (

    <section className="login">
      <div className="login__inner">
        <Link to="/" className="login__logo-link">
          <img  className="login__logo" src={logo} alt="Логотип"/>
        </Link>
        <h2 className="login__title">Рады видеть!</h2>
        <form className="login__form" name="login-form">
          <label className="login__label">E-mail
            <input  className="login__input register__email" name="email" type="email" minLength="5" placeholder="pochta@yandex.ru" required></input>
          </label>
          <label className="login__label">Пароль
          <input  className="login__input register__password" name="password" type="password"  minLength="6" placeholder="Пароль" required></input>
          </label>
          <button className="login__edit">Войти</button>
          <p className="login__question-text">Еще не зарегистрированы?<Link to="/signup" className="login__enter">Регистрация</Link></p>
        </form>
      </div>
    </section>
  
  )

}

export default Login;