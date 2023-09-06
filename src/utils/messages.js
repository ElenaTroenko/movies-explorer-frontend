const REQUIRED_ERROR = 'Это поле обязательное';

export const errorsOnSearch = {
  LOAD_MOVIES_ERR: 'Во время запроса произошла ошибка.' +
  'Возможно, проблема с соединением или сервер недоступен. ' +
  'Подождите немного и попробуйте еще раз.',
  NOT_FOUND_ERR: 'Ничего не найдено',
}

export const errorsOnMovieSearchField = {
  REQUIRED_ERR: 'Нужно ввести ключевое слово',
}

export const errorsOnNameField = {
  REQUIRED_ERR: REQUIRED_ERROR,
  MIN_LENGTH_ERR: 'Имя должно содержать не менее 2 символов',
  REGEX_ERR: 'Только латиница, кириллица, дефис и побел',
}

export const errorsOnEmailField = {
  REQUIRED_ERR: REQUIRED_ERROR,
  MIN_LENGTH_ERR: 'Email должен содержать не менее 5 символов',
  REGEX_ERR: 'Введите правильный адрес email',
}

export const errorsOnPasswordField = {
  REQUIRED_ERR: REQUIRED_ERROR,
  MIN_LENGTH_ERR: 'Пароль должен быть не менее 8 символов',
}