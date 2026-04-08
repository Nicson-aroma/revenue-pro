export function notFoundHandler(req, res) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(error, _req, res, _next) {
  const status = res.statusCode >= 400 ? res.statusCode : 500;
  res.status(status).json({
    message: error.message || 'Internal server error.',
  });
}
