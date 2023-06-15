const crypto = require("crypto");

const sharedSecret = process.env.WEBHOOKS_SECRET;
const hevoUserAgent = "HevoWebhookEvent";

/**
 * Hevo uses HMAC_SHA256 and base64 encoding.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
// Middleware to authenticate request.
function authenticate(req, res, next) {
  console.log(sharedSecret);
  if (!sharedSecret) {
    return next();
  }

  const userAgent = req.headers["user-agent"];
  if (userAgent !== hevoUserAgent) {
    return res.status(401).json({ error: "Unauthorized request" });
  }

  const receivedSignature = req.headers["hmac-signature"];
  if (!receivedSignature) {
    return res.status(401).json({ error: "Unauthorized request" });
  }

  const computedSignature = crypto
    .createHmac("sha256", sharedSecret)
    .update(JSON.stringify(req.body))
    .digest("base64");

  if (receivedSignature !== computedSignature) {
    // update the error messages
    return res.status(401).json({ error: "wrong signature" });
  }

  return next();
}

module.exports.authenticate = authenticate;
