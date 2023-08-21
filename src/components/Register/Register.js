import './Register.css';
import logo from '../../images/logo.png';
import { Link } from "react-router-dom";


function Register() {

  return (

    <section className="register">
      <div className="register__inner">
        <Link to="/" className="register__logo-link">
          <img  className="register__logo" src={logo} alt="Логотип"/>
        </Link>
        <h2 className="register__title">Добро пожаловать!</h2>
        <form className="register__form" name="register-form">
          <label className="register__labal">Имя
            <input  className="register__input register__name" name="name" type="text" required></input>
          </label>
          <label className="register__labal">E-mail
            <input  className="register__input register__email" name="email" type="email" required></input>
          </label>
          <label className="register__labal">Пароль
          <input  className="register__input register__password" name="password" type="password" required></input>
          </label>
          <button className="register__edit">Зарегистрироваться</button>
          <p className="register__question-text">Уже зарегистрированы?<Link to="/signin" className="register__enter">Войти</Link></p>
        </form>
      </div>
    </section>
  )

}

export default Register;