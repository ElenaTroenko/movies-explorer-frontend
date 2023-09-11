// Переводит число (минуты) в строку (человекочитаемый формат)
export const durationToHuman = (minutes) => {
  const hoursResult = parseInt(minutes/60);
  const minutesResult = minutes % 60;

  let humanDuration = '';

  if (hoursResult) {
    humanDuration += `${hoursResult}ч `
  }

  if (minutesResult) {
    humanDuration += `${minutesResult}м`
  }

  return humanDuration;
}