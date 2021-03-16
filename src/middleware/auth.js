const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // grab token
  const token = req.header("x-auth-token");
  // check if it exists or not
  if (!token) {
    return res.status(401).send("Not authorised");
  }
  try {
    // decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded.id);
    req.user = decoded.user;
    next();
  } catch (e) {
    return res.status(401).send("Not authorised");
  }
};
