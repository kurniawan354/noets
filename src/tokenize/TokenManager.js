const Jwt = require('@hapi/jwt');
const InvariantError = require('../exceptions/InvariantError');

const TokenManager = {
  generateAccessToken: (payload) => Jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY),
  genereteRfreshToken: (payload) => Jwt.token.generate(payload, process.env.REFRESH_TOKEN_KEY),
  verifyRefreshToken: (refreshtoken) => {
    try {
      const artifacts = Jwt.token.decode(refreshtoken);
      Jwt.token.verifySignature(artifacts, process.env.REFRESH_TOKEN_KEY);
    } catch (error) {
      throw new InvariantError('Refresh token tidak valid');
    }
  },
};
module.exports = TokenManager;
