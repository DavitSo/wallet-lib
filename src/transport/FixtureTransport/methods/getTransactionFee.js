const logger = require('../../../logger');

module.exports = async function getTransactionFee(address, amount) {
  logger.silly('FakeNet.getTransactionFee');
  return 0.0078;
};
