const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodeData = jwt.verify(token, process.env.SECRET);

    req.userId = decodeData?.id;

    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid credentials." });
  }
};

module.exports = auth;
