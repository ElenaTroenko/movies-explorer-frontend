export const NAV_LINKS = [
  {
    link: '/',
    text: 'Главная',
  },
  {
    link: '/movies',
    text: 'Фильмы',
  },
  {
    link: '/saved-movies',
    text: 'Сохраненные фильмы',
  }
]

export const SCREEN_RULES = {
  FULL: {
    width: 1920,
    cards: 12,
    addedCards: 3,
  },
  MEDIUM: {
    width: 1199,
    cards: 8,
    addedCards: 2,
  },
  SMALL: {
    width: 730,
    cards: 5,
    addedCards: 2,
  },
}

export const BASE_URLS = {
  mainApiBaseUrl: 'http://127.0.0.1:3000',
  moviesApiBaseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  moviesBaseUrl: 'https://api.nomoreparties.co',
}

export const SHORTS_DURATION = 40;

export const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
export const NAME_REGEXP = /^[а-яёa-z\-\s]*?$/i;