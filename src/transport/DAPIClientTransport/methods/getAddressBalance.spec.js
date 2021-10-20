const { expect } = require('chai');

const DAPIClientTransport = require('../DAPIClientTransport');

describe('transports - DAPIClientTransport - getAddressBalance', function suite() {
    let fixture;
    let transport;
    let clientMock;

    beforeEach(() => {
        fixture = {
            balance: 100, received: 100,
        };

        clientMock = {
            core: {
                getAddressBalance: (address) => fixture,
            }
        }

        transport = new DAPIClientTransport(clientMock);
    })

    afterEach(() => {
        transport.disconnect();
    })

    it('should work', async () => {
        const res = await transport.getAddressBalance('test address');

        expect(res).to.deep.equal(fixture);
    });
});
