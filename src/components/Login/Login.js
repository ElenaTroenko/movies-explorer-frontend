import './Login.css';
import React from 'react';
import logo from '../../images/logo.svg';
import { Link } from "react-router-dom";
import { LoadingContext } from '../../contexts/LoadingContext';
import validateField from '../../utils/validateField';
import { EMAIL_REGEXP } from '../../utils/constants';
import { errorsOnEmailField, errorsOnPasswordField } from '../../utils/messages';


const Login = ({ onLogin }) => {
  // подписка на контекст LoadingContext
  const isLoading = React.useContext(LoadingContext);
  // Текст кнопки сабмита
  const buttonText = isLoading ? 'Выполняется вход...' : 'Войти';
  // стэйт полей формы
  const [formValues, setformValues] = React.useState({
    email: '',
    password: '',
  });

  // стэйты текстов ошибок и валидности формы
  const [passwordError, setPasswordError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [formIsValid, setFormIsValid] = React.useState(false);
  const [changedFields, setChangedFields] = React.useState({email: false, password: false});
  const [errorMsg, setErrorMsg] = React.useState('');

  // жизненный цикл: валидация формы при смене значения полей
  React.useEffect(() => {
    const validateEmail = validateField(
      formValues.email,
      {required: true, minLength:5, regex: EMAIL_REGEXP},
      errorsOnEmailField,
      );
    const validatePassword = validateField(
      formValues.password,
      {required: true, minLength: 8},
      errorsOnPasswordField,
    );    

    changedFields.email && setEmailError(validateEmail.errorMessage)
    changedFields.password && setPasswordError(validatePassword.errorMessage)
    setFormIsValid(validatePassword.fieldIsValid && validateEmail.fieldIsValid)
  }, [formValues, changedFields]);

  // хэндлер сабмита
  const handleSubmit = (e) => {
    e.preventDefault();  // не перегружать страницу

    setErrorMsg('');
    onLogin(formValues, setErrorMsg);
  }

  // хэндлер изменений инпутов
  const handleChange = (e) => {
    const {name, value} = e.target;

    setChangedFields({[name]: true});

    setformValues({
      ...formValues,
      [name]: value,
    });
  }

  return (

    <section className="login">
      <div className="login__inner">
        <Link to="/" className="login__logo-link">
          <img  className="login__logo" src={logo} alt="Логотип"/>
        </Link>
        <h2 className="login__title">Рады видеть!</h2>
        <form onSubmit={handleSubmit} className="login__form" name="login-form">
          <label className="login__label">E-mail
            <input onChange={handleChange} className="login__input register__email" name="email" type="email"
              minLength="5" placeholder="pochta@yandex.ru" required value={formValues.email}></input>
            <div className="validate-error">{emailError}</div>
          </label>
          <label className="login__label">Пароль
            <input onChange={handleChange} className="login__input register__password" name="password" type="password"
              minLength="6" placeholder="Пароль"  value={formValues.name}></input>
            <div className="validate-error">{passwordError}</div>
          </label>
          <div className="login__error">{errorMsg}</div>
          <button className="login__edit" >{buttonText}</button>
          <p className="login__question-text">Еще не зарегистрированы?<Link to="/signup" className="login__enter">Регистрация</Link></p>
        </form>
      </div>
    </section>
  
  )
}


export default Login;