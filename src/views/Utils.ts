const formatDate = (date: Date): string => {
  return date.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
}

const formatPrice = (value: number): string => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}


export { formatDate, formatPrice };
