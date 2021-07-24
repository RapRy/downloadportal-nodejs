const jwt = require("jsonwbtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodeData = jwt.verify(token, process.env.SECRET);

    req.userId = decodeData?.id;
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth;
