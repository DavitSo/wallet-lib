const { expect } = require('chai');
const Dashcore = require('@dashevo/dashcore-lib');
const Wallet = require('../../../src/Wallet/Wallet');
const { mnemonicString1 } = require('../../fixtures.json');
const InsightClient = require('../../../src/transports/Insight/insightClient');

let wallet = null;
let account = null;
const insightClientOpts = {
  uri: 'https://testnet-insight.dashevo.org/insight-api-dash',
  socketUri: 'https://testnet-insight.dashevo.org/',
  useSocket: false,
};

describe('Transport : Insight Client', function suite() {
  this.timeout(20000);
  // before((done) => {
  //   const insight = new InsightClient(insightClientOpts);
  //   const config = {
  //     transport: insight,
  //     mnemonic: mnemonicString1,
  //     network: Dashcore.Networks.testnet,
  //   };
  //
  //   wallet = new Wallet(config);
  //   account = wallet.createAccount();
  //   console.log('Account created');
  //   account.events.on('ready', () => {
  //     done();
  //   });
  // });
  /*
  it('should be able to setNetwork', () => {
    expect(account.updateNetwork('livenet')).to.equal(true);
    expect(account.network).to.equal(Dashcore.Networks.livenet);
    expect(account.updateNetwork('testnet')).to.equal(true);
    expect(account.network).to.equal(Dashcore.Networks.testnet);
  });
  it('should be able to subscribe to an event', () => {
    account.transport.transport.subscribeToEvent('noevent');
    expect(account.transport.transport.listeners.noevent).to.exist;
  });
  it('should be able to unsubscribe of an event', () => {
    account.transport.transport.unsubscribeFromEvent('noevent');
    expect(account.transport.transport.listeners.noevent).to.not.exist;
  });
  it('should subscribe to address', () => {
    account.transport.transport.subscribeToAddresses(['yiFNYQxfkDxeCBLyWtWQ9w8UGwYugERLCq']);
    expect(true).to.equal(true);
  });
  it('should be able to pass Insight Client as a transport layer', () => {
    expect(wallet.transport).to.not.equal(null);
    expect(wallet.transport.type).to.equal('InsightClient');
    expect(account.transport).to.not.equal(null);
    expect(account.transport.type).to.equal('InsightClient');
  });
  it('should be able to get the address information', () => {
    const addressesExternalData = account.getAddresses();
    const path = 'm/44\'/1\'/0\'';
    expect(addressesExternalData).to.have.property(`${path}/0/0`);
    expect(addressesExternalData[`${path}/0/0`]).to.have.property('transactions');
    const expectedTransactionsArr = [
      'e66474bfe8ae3d91b2784864fc09e0bd615cbfbf4a2164e46b970bcc488a938f',
      'b4f567f398ec2174df2d775c9bcbc197efda2902bc4b628858d6c8ef7453284d',
    ];
    expect(addressesExternalData[`${path}/0/0`].address).to.equal('yRdxQQpXYh9Xkd91peJ7FJxpEzoRb6droH');
    expect(addressesExternalData[`${path}/0/0`].transactions).to.deep.equal(expectedTransactionsArr);
    expect(addressesExternalData[`${path}/0/0`].utxos).to.deep.equal([]);
    expect(addressesExternalData[`${path}/0/0`].fetchedLast).to.be.greaterThan(1533535093789);
    expect(addressesExternalData[`${path}/0/0`].used).to.equal(true);
  });

  it('should be able to get the utxos information', () => {
    const addressesExternalData = account.getAddresses();
    const path = 'm/44\'/1\'/0\'/0/4';
    expect(addressesExternalData).to.have.property(path);
    expect(addressesExternalData[path]).to.have.property('utxos');
    expect(addressesExternalData[path].address).to.equal('yiFNYQxfkDxeCBLyWtWQ9w8UGwYugERLCq');
    expect(addressesExternalData[path].utxos).to.have.length(1);
    expect(addressesExternalData[path].utxos[0].outputIndex).to.equal(0);
    expect(addressesExternalData[path].utxos[0].satoshis).to.equal(5000000000);
    expect(addressesExternalData[path].utxos[0].scriptPubKey).to.equal('76a914f08d82224ffc020f3d7110e57c3105a5caec058f88ac');
    expect(addressesExternalData[path].utxos[0].txid).to.equal('4ae8d1960c9a4ed83dbeaf1ad94b4a82f11c8574207144beda87113d94a31da1');
    expect(addressesExternalData[path].unconfirmedBalanceSat).to.equal(5000000000);
    expect(addressesExternalData[path].balanceSat).to.equal(0);
  });

  it('should be able to get the total balance of an account', () => {
    const balance = account.getBalance();
    const balanceConfirmed = account.getBalance(false);
    const expectedBalance = 5000000000;
    const expectedBalanceConfirmed = 0;
    expect(balance).to.equal(expectedBalance);
    expect(balanceConfirmed).to.equal(expectedBalanceConfirmed);
  });

  it('should be able to get a valid UTXO', () => {
    const expectedUTXOS = [{
      txid: '4ae8d1960c9a4ed83dbeaf1ad94b4a82f11c8574207144beda87113d94a31da1', outputIndex: 0, satoshis: 5000000000, scriptPubKey: '76a914f08d82224ffc020f3d7110e57c3105a5caec058f88ac', address: 'yiFNYQxfkDxeCBLyWtWQ9w8UGwYugERLCq',
    }];

    const UTXOS = account.getUTXOS();
    expect(UTXOS).to.deep.equal(expectedUTXOS);
  });
  it('should be able to get an unused address', () => {
    const unusedExternal = account.getUnusedAddress();
    const unusedInternal = account.getUnusedAddress('internal');
    expect(unusedExternal.address).to.equal('yf3KLBh1y5ZbNrcab8xr7DN7HPBGhSWoDY');
    expect(unusedInternal.address).to.equal('yeuLv2E9FGF4D9o8vphsaC2Vxoa8ZA7Efp');
  });
  it('should be able to create a transaction', () => {
    const { address } = account.getUnusedAddress();

    expect(address).to.equal('yf3KLBh1y5ZbNrcab8xr7DN7HPBGhSWoDY');

    const txOpts = { amount: 15, to: address };
    const txOptsSatoshis = { satoshis: 1500000000, to: address };

    const expectedRawTx = '0300000001a11da3943d1187dabe44712074851cf1824a4bd91aafbe3dd84e9a0c96d1e84a000000006b483045022100ac79e9600f6f1a5584751ea3eefe6af5298ad4a35f13f91af5b0248ac564338102204c2c2b849b08bbc6164c04335c3421d9cf6ec913a372f6a8d58ceea27f089c330121039c2ac9fcf618c9bbf3c358b9e391d2c6c0829cc740ab1d11621c369083d26078ffffffff02002f6859000000001976a914cd5d758c0898175abfbcd12b13ebe783e1dc2b2b88ac9bc29dd0000000001976a914cbdb740680e713c141e9fb32e92c7d90a3f3297588ac00000000';
    const rawTxFromAmount = account.createTransaction(txOpts);
    const rawTxFromSatoshisAmount = account.createTransaction(txOptsSatoshis);
    expect(rawTxFromAmount).to.equal(expectedRawTx);
    expect(rawTxFromSatoshisAmount).to.equal(expectedRawTx);
  });
  it('should be able to create an instantSend transactions', () => {
    const { address } = account.getUnusedAddress();
    const txOptsInstant = {
      amount: 10,
      to: address,
      isInstantSend: true,
    };
    const expectedRawTx = '0300000001a11da3943d1187dabe44712074851cf1824a4bd91aafbe3dd84e9a0c96d1e84a000000006b4830450221008417550bb0f3e72dd43abf9722ae8293dbf2632bae967c37c41212a1cb5279ae02202cd640c6f9424c3ddd4dbff3dae7a7f45667996bf74b9dc139db58ccb9c161360121039c2ac9fcf618c9bbf3c358b9e391d2c6c0829cc740ab1d11621c369083d26078ffffffff0200ca9a3b000000001976a914cd5d758c0898175abfbcd12b13ebe783e1dc2b2b88acf0006bee000000001976a914cbdb740680e713c141e9fb32e92c7d90a3f3297588ac00000000';
    const rawTx = account.createTransaction(txOptsInstant);
    expect(rawTx).to.equal(expectedRawTx);
  });

  it('should not be able to create an instantSend transactions without opts', () => {
    expect(() => account.createTransaction()).to.throw('An amount in dash or in satoshis is expected to create a transaction');
  });
  it('should not be able to create an instantSend transactions without amount', () => {
    const { address } = account.getUnusedAddress();
    const txOptsInstant = {
      to: address,
      isInstantSend: true,
    };
    expect(() => account.createTransaction(txOptsInstant)).to.throw('An amount in dash or in satoshis is expected to create a transaction');
  });
  it('should not be able to create an instantSend transactions without to', () => {
    const txOptsInstant = {
      amount: 10,
      isInstantSend: true,
    };
    expect(() => account.createTransaction(txOptsInstant)).to.throw('A recipient is expected to create a transaction');
  });

  it('should be able to create an instantSend transactions with satoshis', () => {
    const { address } = account.getUnusedAddress();
    const txOptsInstant = {
      satoshis: 11,
      to: address,
      isInstantSend: true,
    };
    const expectedRawTx = '0300000001a11da3943d1187dabe44712074851cf1824a4bd91aafbe3dd84e9a0c96d1e84a000000006a47304402204f616ce44378048646e1b486ca4eb751c5867bcecb865b4ac32b8dbafd43764302200995caac8059f26cc0c6dbfac9f68b61085346dbfa038a18990139fbaf8387a20121039c2ac9fcf618c9bbf3c358b9e391d2c6c0829cc740ab1d11621c369083d26078ffffffff020b000000000000001976a914cd5d758c0898175abfbcd12b13ebe783e1dc2b2b88ace5ca052a010000001976a914cbdb740680e713c141e9fb32e92c7d90a3f3297588ac00000000';
    const rawTx = account.createTransaction(txOptsInstant);
    expect(rawTx).to.equal(expectedRawTx);
  });

  it('should be able to create an instantSend transactions with satoshis and amount. Ammount is ignored?', () => {
    const { address } = account.getUnusedAddress();
    const txOptsInstant = {
      amount: 10,
      satoshis: 11,
      to: address,
      isInstantSend: true,
    };
    const expectedRawTx = '0300000001a11da3943d1187dabe44712074851cf1824a4bd91aafbe3dd84e9a0c96d1e84a000000006a47304402204f616ce44378048646e1b486ca4eb751c5867bcecb865b4ac32b8dbafd43764302200995caac8059f26cc0c6dbfac9f68b61085346dbfa038a18990139fbaf8387a20121039c2ac9fcf618c9bbf3c358b9e391d2c6c0829cc740ab1d11621c369083d26078ffffffff020b000000000000001976a914cd5d758c0898175abfbcd12b13ebe783e1dc2b2b88ace5ca052a010000001976a914cbdb740680e713c141e9fb32e92c7d90a3f3297588ac00000000';
    const rawTx = account.createTransaction(txOptsInstant);
    expect(rawTx).to.equal(expectedRawTx);
  });

  it('should be able to create a wallet without transport', () => {
    const wallet2 = new Wallet({
      mnemonic: 'wisdom claim quote stadium input danger planet angry crucial cargo struggle medal',
      network: 'testnet',
    });
    expect(wallet2.transport).to.not.equal(null);
    const acc1 = wallet2.createAccount({ mode: 'light' });
    const acc2 = wallet2.createAccount({ mode: 'light' });
    const acc3 = wallet2.createAccount({ mode: 'light' });


    [acc1, acc2, acc3].forEach((el, i) => {
      // eslint-disable-next-line no-unused-expressions
      expect(el).to.exist;
      expect(el).to.be.a('object');
      expect(el.constructor.name).to.equal('Account');
      expect(el.BIP44PATH).to.equal(`m/44'/1'/${i}'`);
    });
    wallet2.disconnect();
  });

  it('should be able to create a wallet and account with invalid transport', () => {
    const wallet3 = new Wallet({
      mnemonic: 'wisdom claim quote stadium input danger planet angry crucial cargo struggle medal',
      network: 'testnet',
      transport: 'haha',

    });
    expect(wallet3.transport).to.not.equal(null);
    expect(wallet3.transport.isValid).to.equal(false);
    expect(wallet3.transport.type).to.equal('String');

    const acc1 = wallet3.createAccount({ mode: 'light' });
    const acc2 = wallet3.createAccount({ mode: 'light' });
    const acc3 = wallet3.createAccount({ mode: 'light' });
    [acc1, acc2, acc3].forEach((el, i) => {
      // eslint-disable-next-line no-unused-expressions
      expect(el).to.exist;
      expect(el).to.be.a('object');
      expect(el.constructor.name).to.equal('Account');
      expect(el.BIP44PATH).to.equal(`m/44'/1'/${i}'`);
    });
    expect(acc1.transport).to.not.equal(null);
    expect(acc1.transport).to.be.a('Object');
    expect(acc1.transport.isValid).to.equal(false);
    expect(acc1.transport.type).to.equal('String');
    wallet3.disconnect();
  });

  it('should not be able to getAddressSummary by invalid value', () => {
    const transport = new InsightClient(insightClientOpts);
    return transport.getAddressSummary('address').then(
      () => Promise.reject(new Error('Expected method to reject.')),
      err => expect(err).to.be.a('Error').with.property('message', 'Request failed with status code 400'),
    ).then(() => { transport.closeSocket(); });
  });
  */
  /*
  it('should get a transactions History', () => {
    const expected = [{
      type: 'sent', txid: 'e66474bfe8ae3d91b2784864fc09e0bd615cbfbf4a2164e46b970bcc488a938f', time: 1529233103, from: ['yRdxQQpXYh9Xkd91peJ7FJxpEzoRb6droH'], to: { address: 'yf6qYQzQoCzpF7gJYAa7s3n5rBK89RoaCQ', amount: '50.00000000' },
    }, {
      type: 'receive', txid: 'b4f567f398ec2174df2d775c9bcbc197efda2902bc4b628858d6c8ef7453284d', time: 1529201724, from: ['yfPzgAZasiJGbiaYfJq7zXNN58PJAhbV1R'], to: { address: 'yRdxQQpXYh9Xkd91peJ7FJxpEzoRb6droH', amount: '100.00000000' },
    }, {
      type: 'sent', txid: '6770dee69437c6bf83a56956a04b807ef78cc62b79369b9551f935a922acbf64', time: 1533535851, from: ['yf6qYQzQoCzpF7gJYAa7s3n5rBK89RoaCQ'], to: { address: 'yRwh2qqnSgWKSaE7Vob35JY4wprvx8ujPZ', amount: '10.00000000' },
    }, {
      type: 'sent', txid: '6c42619dd84a02577458ba4f880fe8cfaced9ed518ee7c360c5b107d6ff5b62d', time: 1533776547, from: ['yRwh2qqnSgWKSaE7Vob35JY4wprvx8ujPZ'],
    }, {
      type: 'sent', txid: '1240c9e3bba3f143ec354bd37e4b860609b944dee2e426e9868e5c3244e47f04', time: 1533766930, from: ['yPT2e1oAxN6GEa3tqahKg7KrXkwtKgpgPm'], to: { address: 'yeuLv2E9FGF4D9o8vphsaC2Vxoa8ZA7Efp', amount: '9.19990000' },
    }, {
      type: 'sent', txid: '1954c3263831dd4d80a9dd8f83a6ce998dae0bed3c9ae111f7c84b0a4f65235f', time: 1533535885, from: ['yeuLv2E9FGF4D9o8vphsaC2Vxoa8ZA7Efp'], to: { address: 'yPT2e1oAxN6GEa3tqahKg7KrXkwtKgpgPm', amount: '10.00000000' },
    }, {
      type: 'receive', txid: '4ae8d1960c9a4ed83dbeaf1ad94b4a82f11c8574207144beda87113d94a31da1', time: 1533815679, from: ['yQxDtKBqQvo3ecMqQVJv7rrZ6PMAGVDNBd'], to: { address: 'yiFNYQxfkDxeCBLyWtWQ9w8UGwYugERLCq', amount: '50.00000000' },
    }];

    return account.getTransactionHistory().then(result => expect(result).to.deep.equal(expected));
  }); */
  /*
  it('should get transaction', () => {
    const expected = {
      txid: 'b42c5052d7d31a422e711d50d3754217b0b16b6dfa29cf497b3dd75afa4febcb',
      version: 1,
      locktime: 0,
      vin: [{
        txid: 'b452f2d7762b5cd94a0d375e60547c93035b97978a37bcaeed186d27e31feb3a', vout: 1, sequence: 4294967295, n: 0, scriptSig: { hex: '483045022100d803161dfdc72be62cb97cc62e862f5c30c061ea987514e7f8e4ff85b5420ed902205c188d20aff9475a86623addf055bed5b8c36e6de2285af1438fb8ede64ae668012103d9576eb9807c16c7bf8e4268969311dd0c1d3209db09e4a62a631b4d68f16fe0', asm: '3045022100d803161dfdc72be62cb97cc62e862f5c30c061ea987514e7f8e4ff85b5420ed902205c188d20aff9475a86623addf055bed5b8c36e6de2285af1438fb8ede64ae668[ALL] 03d9576eb9807c16c7bf8e4268969311dd0c1d3209db09e4a62a631b4d68f16fe0' }, addr: 'yXhm56EBd23RrZpq8WMp1UUUiZobStcaWG', valueSat: 519960000, value: 5.1996, doubleSpentTxID: null,
      }],
      vout: [{
        value: '1.00000000',
        n: 0,
        scriptPubKey: {
          hex: '76a914843859336f31e96025afc658bf152fb0b0bb751188ac', asm: 'OP_DUP OP_HASH160 843859336f31e96025afc658bf152fb0b0bb7511 OP_EQUALVERIFY OP_CHECKSIG', addresses: ['yYNZYgZrCVHQkJ4sPbmegb768zLaoAtREb'], type: 'pubkeyhash',
        },
        spentTxId: '6ca8795f2534972e1371249c3d7b6c5095e1513bc8cc351eeaa2f364020dbc01',
        spentIndex: 4,
        spentHeight: 203674,
      }, {
        value: '4.19950000',
        n: 1,
        scriptPubKey: {
          hex: '76a91449126d84886a9bfc4a2a49aa5ba9cb45c994875288ac', asm: 'OP_DUP OP_HASH160 49126d84886a9bfc4a2a49aa5ba9cb45c9948752 OP_EQUALVERIFY OP_CHECKSIG', addresses: ['ySypFbLpFTXrBbpFqRezwpdwwuaDCfrgpo'], type: 'pubkeyhash',
        },
        spentTxId: null,
        spentIndex: null,
        spentHeight: null,
      }],
      blockhash: '000000000adca9739d088cf532a981d88c301987e40948ffb90bf1c9eeb98ccd',
      blockheight: 203313,
      time: 1533781707,
      blocktime: 1533781707,
      valueOut: 5.1995,
      size: 226,
      valueIn: 5.1996,
      fees: 10000,
      txlock: false,
    };
    return account.getTransaction('b42c5052d7d31a422e711d50d3754217b0b16b6dfa29cf497b3dd75afa4febcb').then(
      data => expect(data).to.be.deep.equal(expected),
    );
  });
  it('should deal with invalid transaction', () => {
    const expected = {};
    return account.getTransaction(1).then(
      data => expect(data).to.be.a('String'),
      err => expect(err).to.be.a('Error').with.property('message', 'Received an invalid txid to fetch : 1'),
    );
    return account.getTransaction(1).then(result => expect(result).to.deep.equal(expected));
  });
  it('should be able to broadcast transaction', () => {
    const { address } = account.getUnusedAddress();
    const txOptsInstant = {
      amount: 10,
      to: address,
      isInstantSend: true,
    };
    const tx = account.createTransaction(txOptsInstant);
    expect(tx).to.equal('0300000001a11da3943d1187dabe44712074851cf1824a4bd91aafbe3dd84e9a0c96d1e84a000000006b4830450221008417550bb0f3e72dd43abf9722ae8293dbf2632bae967c37c41212a1cb5279ae02202cd640c6f9424c3ddd4dbff3dae7a7f45667996bf74b9dc139db58ccb9c161360121039c2ac9fcf618c9bbf3c358b9e391d2c6c0829cc740ab1d11621c369083d26078ffffffff0200ca9a3b000000001976a914cd5d758c0898175abfbcd12b13ebe783e1dc2b2b88acf0006bee000000001976a914cbdb740680e713c141e9fb32e92c7d90a3f3297588ac00000000');
    const fakedTx = `${tx}00201010`;

    return account.broadcastTransaction(fakedTx).then(
      data => expect(data).to.be.a('String'),
      err => expect(err).to.be.a('Error').with.property('message', 'Error: Request failed with status code 400'),
    );
  }); */
  after((done) => {
    account.disconnect();
    account = null;
    wallet = null;
    done();
  });
});