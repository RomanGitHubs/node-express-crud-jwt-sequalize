const crypto = require('crypto')
const { writeFileSync } = require('fs')

function generateKeyPair() {
  const keyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem'
    }
  })

  writeFileSync('./config/public_key.pem', keyPair.publicKey)

  writeFileSync('./config/private_key.pem', keyPair.privateKey)
}

generateKeyPair()



// https://nodejs.org/api/crypto.html#crypto_crypto_generatekeypairsync_type_options
// https://tools.ietf.org/html/rfc8017#section-3

