export const nf = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 2,
  roundingIncrement: 5,
});

export const tf = (date) => {
  const options = { day: 'numeric', month: 'long' };
  return date.toLocaleDateString('ru-RU', options);
}
