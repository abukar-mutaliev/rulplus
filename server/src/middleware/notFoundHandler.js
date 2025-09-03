const notFoundHandler = (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Маршрут ${req.originalUrl} не найден на этом сервере`,
    code: 'ROUTE_NOT_FOUND',
  });
};

module.exports = { notFoundHandler }; 