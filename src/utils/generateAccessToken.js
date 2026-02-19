const jwt = require("jsonwebtoken");
const PORT = process.env.JWT_EXPIRE || "1D";
module.exports = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: PORT}
  );
};
