const jwt = require("jsonwebtoken");

exports.signToken = (userId, expiresIn = "7d") => {
  const payload = {
    sub: userId
  };
  return jwt.sign(payload, process.env.SECRET_JWT, { expiresIn });
};

/**
 *  The JWT Checker middleware function.
 */
exports.verifyJWT = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }
  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(" ")[1];
  // decode the token using a secret key-phrase
  return jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err || !decoded.sub) {
      return res.status(401).end();
    }
    return next();
  });
};
