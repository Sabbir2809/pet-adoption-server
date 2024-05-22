import { TOptionsResult, TPaginationOptions } from "../types/pagination";

// calculate pagination
const calculatePagination = (options: TPaginationOptions): TOptionsResult => {
  const page: number = Number(options.page) || 1;
  const limit: number = Number(options.limit) || 10;
  const skip: number = (page - 1) * limit;

  const sortBy = options.sortOrder || "createdAt";
  const sortOrder = options.sortOrder || "desc";

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export default calculatePagination;
