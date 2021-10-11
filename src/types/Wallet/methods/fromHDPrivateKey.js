const { is } = require('../../../utils');
const KeyChain = require('../../KeyChain/KeyChain');
const { WALLET_TYPES } = require('../../../CONSTANTS');

/**
 * Will set a wallet to work with a seed (HDPrivateKey)
 * @param hdPrivateKey
 */
module.exports = function fromHDPrivateKey(hdPrivateKey) {
  if (!is.HDPrivateKey(hdPrivateKey)) throw new Error('Expected a valid HDPrivateKey (typeof HDPrivateKey or String)');
  this.walletType = WALLET_TYPES.HDWALLET;
  this.mnemonic = null;
  const { publicKey } = hdPrivateKey;
  // this.HDPrivateKey = HDPrivateKey(hdPrivateKey);
  this.keyChain = new KeyChain({ publicKey: publicKey });
};
