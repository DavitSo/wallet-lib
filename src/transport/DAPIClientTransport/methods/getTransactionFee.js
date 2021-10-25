const logger = require('../../../logger');

module.exports = async function getTransactionFee(address, amount) {
  logger.silly('DAPIClientTransport.getTransactionFee');
  return this.client.core.getTransactionFee(address, amount);
};
