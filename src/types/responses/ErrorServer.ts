type ErrorServer = {
  message?: string;
  type: "error server";
  errors: any | any[];
}

export default ErrorServer;
