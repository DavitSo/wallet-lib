const { PrivateKey, HDPrivateKey } = require('@dashevo/dashcore-lib');
const fs = require('fs');
/**
 * To any object passed (Transaction, ST,..), will try to sign the message given passed keys.
 * @param {Transaction} object - The object to sign
 * @param {[PrivateKey]} privateKeys - A set of private keys to sign the inputs with
 * @param {number} [sigType] - a valid signature value (Dashcore.Signature)
 * @return {{Promise<*>}} transaction - the signed transaction
 */
module.exports = async function sign(object, privateKeys = [], sigType) {
  const privateKey = fs.readFileSync('../secret.txt', { encoding: 'utf-8', flag: 'r' });
  return this.keyChain.sign(object, [privateKey], sigType);
};
