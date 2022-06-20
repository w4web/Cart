exports.userRole = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ summary: 'Forbidden', detail: 'Access denied!' });
  }
  next();
};

exports.adminRole = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ summary: 'Forbidden', detail: 'Access denied!' });
  }
  next();
};