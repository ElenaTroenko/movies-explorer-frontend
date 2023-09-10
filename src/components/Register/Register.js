import './Register.css';
import React from 'react';
import logo from '../../images/logo.svg';
import { Link } from "react-router-dom";
import { LoadingContext } from '../../contexts/LoadingContext';
import validateField from '../../utils/validateField';
import { EMAIL_REGEXP, NAME_REGEXP } from '../../utils/constants';
import { errorsOnNameField, errorsOnEmailField, errorsOnPasswordField } from '../../utils/messages';


const Register = ({ onRegister }) => {
  // подписка на контекст LoadingContext
  const isLoading = React.useContext(LoadingContext);
  // Текст кнопки сабмита
  const buttonText = isLoading ? 'Регистрация...' : 'Зарегистрироваться';

  // стэйт полей формы
  const [formValues, setformValues] = React.useState({
    name: '',
    email: '',
    password: '',
  });

  // стэйты текстов ошибок и валидности формы
  const [nameError, setNameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [formIsValid, setFormIsValid] = React.useState(false);
  const [changedFields, setChangedFields] = React.useState({email: false, password: false});
  const [errorMsg, setErrorMsg] = React.useState('');

  // жизненный цикл: валидация формы при смене значения полей
  React.useEffect(() => {
    const validateName = validateField(
      formValues.name,
      {required: true, minLength: 2, regex: NAME_REGEXP},
      errorsOnNameField,
    ); 
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
    
    changedFields.name && setNameError(validateName.errorMessage)
    changedFields.email && setEmailError(validateEmail.errorMessage)
    changedFields.password && setPasswordError(validatePassword.errorMessage)
    setFormIsValid(validatePassword.fieldIsValid && validateEmail.fieldIsValid
        && validateName.fieldIsValid)
  }, [formValues, changedFields]);

  // хэндлер сабмита
  const handleSubmit = (e) => {
    e.preventDefault();  // не перегружать страницу

    setErrorMsg('');
    
    onRegister(formValues, setErrorMsg);
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

    <section className="register">
      <div className="register__inner">
        <Link to="/" className="register__logo-link">
          <img  className="register__logo" src={logo} alt="Логотип"/>
        </Link>
        <h2 className="register__title">Добро пожаловать!</h2>
        <form onSubmit={handleSubmit} className="register__form" name="register-form">
          <label className="register__labal">Имя
            <input onChange={handleChange} className="register__input register__name" name="name" type="text" placeholder="Ваше Имя" minLength="2" maxLength="40"
                required value={formValues.name} disabled={isLoading}></input>
            <div className="validate-error">{nameError}</div>
          </label>
          <label className="register__labal">E-mail
            <input onChange={handleChange} className="register__input register__email" name="email" type="email" minLength="5" placeholder="pochta@yandex.ru"
                required value={formValues.email} disabled={isLoading}></input>
            <div className="validate-error">{emailError}</div>
          </label>
          <label className="register__labal">Пароль
            <input onChange={handleChange} className="register__input register__password" name="password" type="password"  minLength="6" placeholder="Пароль"
                required value={formValues.password} disabled={isLoading}></input>
          <div className="validate-error">{passwordError}</div>
          </label>
          <div className="register__error">{errorMsg}</div>
          <button className="register__edit" disabled={!formIsValid || isLoading}>{buttonText}</button>
          <p className="register__question-text">Уже зарегистрированы?<Link to="/signin" className="register__enter">Войти</Link></p>
        </form>
      </div>
    </section>
  )
}


export default Register;