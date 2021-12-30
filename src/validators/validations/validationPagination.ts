const validationPagination = (page: number, limit: number) => {
  if(typeof page !== "number" ||  typeof limit !== "number"){
    return {
      page: 1,
      limit: 10
    }
  }

  page = (typeof page === "number" && page > 0) ? page : 1;
  limit = (typeof limit === "number" && limit > 0) ? limit : 10;
  return { page, limit};
}

export { validationPagination };
