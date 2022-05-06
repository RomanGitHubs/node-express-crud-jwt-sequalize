const { setCookie } = require('./setCookie.js');
const { setSecurityHeaders } = require('./setSecurityHeaders.js');
const { verifyAccess } = require('./verifyAccess.js');
const { verifyAuth } = require('./verifyAuth.js');
const { verifyPermission } = require('./verifyPermission');

const VERIFICATION_CODE = 'verification_code';
const COOKIE_NAME = 'qid';
const ACCESS_TOKEN_SECRET = 'access_token_secret';

module.exports = {setCookie, setSecurityHeaders, verifyAccess,
  verifyAuth, verifyPermission, VERIFICATION_CODE, COOKIE_NAME,
  ACCESS_TOKEN_SECRET}