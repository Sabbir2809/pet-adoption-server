export type TErrorResponse = {
  statusCode: number;
  message: string;
  errorDetails: any;
};

export type TErrorDetails = {
  field: string | number;
  message: string;
}[];
