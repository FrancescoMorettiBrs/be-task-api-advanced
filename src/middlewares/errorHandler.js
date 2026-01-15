export default function errorHandler(err, req, res, next) {
  console.error("Errore", err.message);

  res.status(500).json({
    success: false,
    message: "Errore interno al server",
  });
}
