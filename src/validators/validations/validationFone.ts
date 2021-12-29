const cleanFoneClient = (fone: string): string => {

  const foneNumber: string = fone.replace(/[^\d]+/g, '');

  return foneNumber;
}

export { cleanFoneClient };
