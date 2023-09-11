const validateField = (
    value,          // валидируемое значение (строка)
    {
      required,     // значение требуется (не может быть пустым)
      minLength,    // минимальная длина значения value (строки)
      regex         // регулярное выражение для теста value
    },
    errorMessages,  // Объект констант сообщений об ошибках:
                    // REQUIRED_ERR, MIN_LENGTH_ERR, REGEX_ERR
    ) => {
  
  // инициализация
  let validRequired = true;
  let validMinLength = true;
  let validRegex = true;
  let fieldIsValid = true;
  let errorMessage = '';

  // приведение к строке (на случай, если value - не строка)
  value = String(value);

  // Валидация Regex
  if (regex) {
    validRegex = regex.test(value);
    if (!validRegex) {
      errorMessage = errorMessages.REGEX_ERR
    }
  }

  // Валидация минимальной длины
  if (minLength) {
    validMinLength = value.length >= minLength;
    if (!validMinLength) {
      errorMessage = errorMessages.MIN_LENGTH_ERR
    }
  }

  // Валидация обязательного поля
  if (required) {
    validRequired = value.length > 0;
    if (!validRequired) {
      errorMessage = errorMessages.REQUIRED_ERR
    }
  }

  fieldIsValid = validRequired && validMinLength && validRegex

  // Возвращает объект ответа с 2-мя ствойствами:
  return {
    fieldIsValid, 
    errorMessage,
  }
}


export default validateField;