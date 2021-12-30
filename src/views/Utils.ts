const formatDate = (date: Date): string => {
  return date.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
}


export { formatDate };
