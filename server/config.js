module.exports = {
  jwt_token_secret: process.env.JWT_SECRET || "123456",
  jwt_token_lifetime: process.env.JWT_TOKEN_LIFETIME || "30d",
};
