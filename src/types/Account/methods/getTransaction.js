/**
 * Get a transaction from a provided txid
 * @param {transactionId} txid - Transaction Hash
 * @return {Promise<{metadata: TransactionMetaData|null, transaction: Transaction}>}
 */
async function getTransaction(txid = null) {
  const searchTransaction = await this.storage.searchTransaction(txid);
  const searchTransactionMetadata = await this.storage.searchTransactionMetadata(txid);
  if (searchTransaction.found) {
    const searchResult = { transaction: searchTransaction.result, metadata: null };
    if (searchTransactionMetadata.found) {
      searchResult.metadata = searchTransactionMetadata.result;
    }
    return searchResult;
  }
  const getTransactionResponse = await this.transport.getTransaction(txid);
  if (!getTransactionResponse) return null;
  const {
    transaction,
    blockHash,
    height,
    instantLocked,
    chainLocked,
  } = getTransactionResponse;

  const metadata = {
    blockHash,
    height,
    instantLocked,
    chainLocked,
  };
  if (this.cacheTx) {
    await this.importTransactions([[transaction, metadata]]);
    if (this.cacheBlockHeaders) {
      const searchBlockHeader = this.storage.searchBlockHeader(height);
      if (!searchBlockHeader.found) {
        // Trigger caching of blockheader
        await this.getBlockHeader(height);
      }
    }
  }
  return { transaction, metadata };
}

module.exports = getTransaction;
