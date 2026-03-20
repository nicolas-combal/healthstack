module.exports = (err, req, res, next) => {
  const status = err.status || 500;
  const code = err.code || 'INTERNAL_ERROR';
  const message = err.message || 'Erreur interne';

  const isProd = process.env.NODE_ENV === 'production';

  res.status(status).json({
    error: {
      code,
      message: isProd && status === 500 ? 'Internal Server Error' : message,
      status
    }
  });
};
