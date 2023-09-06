import { BASE_URLS } from './constants';


class MainApi {
  // принимает объект данных настроек
  constructor({ BASE_URLS, headers }) {
    this._baseUrl = BASE_URLS.mainApiBaseUrl;  // базовый url
    this._headers = headers;    // стандартные заголовки запросов
  }

  _getResponseData(res, errMsg) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(res.json());
  }

  // добавляет заголовки для запросов
  // ожидает на вход объект свойство-значение
  addHeaders(headers) {
    for (let header in headers) {
      this._headers[header] = headers[header];
    }
  }

  // Создать пользователя (регистрация)
  createUser({ name, email, password }) {
    const url = `${this._baseUrl}/signup`;

    return fetch(
      url,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({ name, email, password }),
      },
    )
    .then((res) => this._getResponseData(res))
  }

  // Получить информацию о пользователе
  getUserInfo() {
    const url = `${this._baseUrl}/users/me`;

    return fetch(
      url,
      {
        method: 'GET',
        headers: this._headers,
      },
    )
    .then((res) => this._getResponseData(res))
  }

  // Войти (логин)
  login({ email, password }) {
    const url = `${this._baseUrl}/signin`;

    return fetch(
      url,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({ email, password }),
      },
    )
    .then((res) => this._getResponseData(res))
  }

  // Обновить информацию о пользователе
  updateUserInfo({ name, email }) {
    const url = `${this._baseUrl}/users/me`;

    return fetch(
      url,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          user: {name, email},
        }),
      },
    )
    .then((res) => this._getResponseData(res))
  }

  // Получить сохраненные фильмы
  getMovies() {
    const url = `${this._baseUrl}/movies/`;

    return fetch(
      url,
      {
        method: 'GET',
        headers: this._headers,
      },
    )
    .then((res) => this._getResponseData(res))
  }

  // Добавить фильм в сохраненные
  createMovie(data) {
    const url = `${this._baseUrl}/movies/`;

    return fetch(
      url,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(data),
      },
    )
    .then((res) => this._getResponseData(res))
  }

  // Удалить фильм из сохраненных
  deleteMovie(movieId) {
    const url = `${this._baseUrl}/movies/${movieId}`;

    return fetch(
      url,
      {
        method: 'DELETE',
        headers: this._headers,
      },
    )
    .then((res) => this._getResponseData(res))
  }

  checkToken(token) {
    // Bearer токен
    const authorization = `Bearer ${token}`;

    // добавить к заголовкам Bearer токен в API
    this.addHeaders({ authorization: authorization })

    return fetch(
      `${this._baseUrl}/users/me`,
      {
        method: 'GET',
        headers: this._headers,
      },
    )
    .then((res) => this._getResponseData(res))
  }

}


const mainApi = new MainApi({
  BASE_URLS,
  headers: {
    'Content-Type': 'application/json',
  },
});


export default mainApi;