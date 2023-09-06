import { BASE_URLS } from './constants';


class MoviesApi {
  // принимает объект данных настроек
  constructor({ BASE_URLS, headers }) {
    this._baseUrl = BASE_URLS.moviesApiBaseUrl;  // базовый url
    this._headers = headers;    // стандартные заголовки запросов
  }

  _getResponseData(res, errMsg) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(res.json());
  }

  // Получить информацию о пользователе
  getMovies(){
    const url = `${this._baseUrl}`;

    return fetch(
      url,
      {
        method: 'GET',
        headers: this._headers,
      },
    )
    .then((res) => this._getResponseData(res))
  }
}


const moviesApi = new MoviesApi({
  BASE_URLS,
  headers: {
    'Content-Type': 'application/json',
  },
});


export default moviesApi;