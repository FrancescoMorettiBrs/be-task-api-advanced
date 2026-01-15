export default function notFound(req, res, next) {
  res.status(404).json({
    success: false,
    message: "Endpoint non trovato",
  });
}
