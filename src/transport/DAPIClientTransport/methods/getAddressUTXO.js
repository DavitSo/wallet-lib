const logger = require('../../../logger');

module.exports = async function getAddressUTXO(address) {
  logger.silly('DAPIClientTransport.getAddressUTXO');
  return this.client.core.getAddressUTXO(address);
};
