const experationReserve = (days: number): Date => {
  const dateExperationReserve = new Date();
  dateExperationReserve.setDate(dateExperationReserve.getDate() + days);
  return dateExperationReserve;
}

export default experationReserve;
