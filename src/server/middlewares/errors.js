const notFoundError = (req, res) => {
  res.status(404);
  res.json({ error: true, message: "Endpoint not found" });
};

// eslint-disable-next-line no-unused-vars
const generalError = (err, req, res, next) => {
  const errorCode = err.code ?? 500;
  const errorMessage = err.code ? err.message : "General error";
  res.status(errorCode);
  res.json({ error: true, message: errorMessage });
};

module.exports = { notFoundError, generalError };
