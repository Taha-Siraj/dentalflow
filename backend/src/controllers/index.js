export function getHealthStatus(req, res) {
  res.status(200).json({
    success: true,
    message: "DentalFlow API backend operational",
    timestamp: new Date().toISOString(),
  });
}
