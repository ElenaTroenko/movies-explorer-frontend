import './Profile.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { LoadingContext } from '../../contexts/LoadingContext';
import validateField from '../../utils/validateField';
import { EMAIL_REGEXP, NAME_REGEXP } from '../../utils/constants';
import { errorsOnNameField, errorsOnEmailField} from '../../utils/messages';


const Profile = ({ onSignOut, onEdit, okMsg, errorMsg }) => {
  // подписка на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);
  // подписка на контекст LoadingContext
  const isLoading = React.useContext(LoadingContext);
  
  // Текст кнопки сабмита
  const buttonText = isLoading ? 'Сохранение...' : 'Сохранить';

  // стэйты 
  const [nameError, setNameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [formIsValid, setFormIsValid] = React.useState(false);
  const [okMessage, setOkMessage] = React.useState(okMsg);
  const [errorMessage, setErrorMessage] = React.useState(errorMsg);

  // стэйт полей формы
  const [formValues, setformValues] = React.useState({
    name: '',
    email: '',
  });

  // стэйты
  const [editing, setEditing] = React.useState(false);

  // жизненный цикл: заполнить из пользователя при монтировании
  React.useEffect(() => {
    currentUser.name && currentUser.email
    && setformValues({name: currentUser.name, email: currentUser.email});
  }, []);

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

    setNameError(validateName.errorMessage)
    setEmailError(validateEmail.errorMessage)
    setFormIsValid(
        validateName.fieldIsValid
        && validateEmail.fieldIsValid
        && (formValues.name !== currentUser.name || formValues.email !== currentUser.email)
    )
  }, [formValues]);

  React.useEffect(() => {
    !isLoading && setEditing(false);
  }, [isLoading])

  // Хэндлер кнопки "Редактировать"
  const handleEdit = () => {
    setEditing(true);
    setOkMessage('');
    setErrorMessage('');
  }

  // хэндлер сабмита
  const handleSubmit = (e) => {
    e.preventDefault();  // не перегружать страницу

    onEdit(formValues);
  }

  // хэндлер изменений инпутов
  const handleChange = (e) => {
    const {name, value} = e.target;

    setformValues({
      ...formValues,
      [name]: value,
    });
  }


  return (
    
      <div className="profile">
        <h2 className="profile-name">Привет, {currentUser.name}!</h2>
        <form onSubmit={handleSubmit} className="profile__form" name="profile-form">
          <label className="profile__placeholder">
            Имя
            <input onChange={handleChange} className="profile__input profile__name" name="name" type="text"
              placeholder="Ваше Имя" minLength="2" maxLength="40" required value={formValues.name} disabled={isLoading || !editing}></input>
          {nameError && <div className ="validate-error">{nameError}</div>}
          </label>
          <label className="profile__placeholder">
            E-mail
            <input onChange={handleChange} className="profile__input profile__email" name="email" type="email"
              placeholder="pochta@yandex.ru" minLength="5" required value={formValues.email} disabled={isLoading || !editing}></input>
              {emailError && <div className ="validate-error">{emailError}</div>}
            </label>
          {<div className ="profile__ok">{okMessage}</div>}
          {<div className ="profile__error">{errorMessage}</div>}
          {editing
          ? <button className="profile__save" disabled={!formIsValid || isLoading}>{buttonText}</button>
          : <>
              <button onClick={handleEdit} className="profile__edit">Редактировать</button>
              <Link onClick={onSignOut} className="profile__exit">Выйти из аккаунта</Link>
              </>
          }
        </form>
      </div>

  )
}


export default Profile;  