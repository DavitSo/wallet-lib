/**
 * Return wallet's account indexes
 * @returns {*}
 */
function getAccountIndexes() {
  return this.accounts.map((el) => el.index);
}

module.exports = getAccountIndexes;
