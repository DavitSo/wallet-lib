const { expect } = require('chai');
const DAPIClientTransport = require('../DAPIClientTransport');

describe('transports - DAPIClientTransport - getTransactionFee', function suite() {
    let fixture;
    let transport;
    let clientMock;

    beforeEach(() => {
        fixture = {
            fee: 0.0004,
        };

        clientMock = {
            core: {
                getTransactionFee: (address, amount) => fixture,
            }
        }
        transport = new DAPIClientTransport(clientMock);
    })

    afterEach(() => {
        transport.disconnect();
    })

    it('should work', async () => {
        const res = await transport.getTransactionFee('test call');

        expect(res).to.deep.equal(fixture);
    });
});
