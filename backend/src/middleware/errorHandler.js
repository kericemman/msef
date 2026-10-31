export default function errorHandler(error, _request, response, _next) {
  const status = Number(error.status) || 500;
  if (status >= 500) console.error(error);
  response
    .status(status)
    .json({
      message:
        status >= 500 ? "An unexpected server error occurred." : error.message,
    });
}
