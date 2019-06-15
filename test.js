const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const moment = require('moment');
const nock = require('nock');
const Sharedcount = require('./index');

nock.disableNetConnect();
chai.use(chaiAsPromised);
chai.should();
const { expect } = chai;

const baseUrl = 'https://api.sharedcount.com';
const apikey = 'TEST_API_KEY';
const expectedResult = { result: 'ok' };

describe('Sharedcount unit tests', () => {
  const sc = new Sharedcount({ apikey });

  afterEach(() => {
    nock.cleanAll();
  });

  it('url', async () => {
    const url = 'http://domain.com';
    nock(baseUrl)
      .get('/v1.0')
      .query({ apikey, url })
      .reply(200, expectedResult);
    const result = await sc.url(url);
    expect(result).to.be.deep.equal(expectedResult);
  });

  it('url (without http prefix)', async () => {
    const domain = 'domain.com';
    nock(baseUrl)
      .get('/v1.0')
      .query({ apikey, url: `http://${domain}` })
      .reply(200, expectedResult);
    const result = await sc.url(domain);
    expect(result).to.be.deep.equal(expectedResult);
  });

  it('domain whitelist', async () => {
    nock(baseUrl)
      .get('/v1.0/domain_whitelist')
      .query({ apikey })
      .reply(200, expectedResult);

    const result = await sc.domainWhitelist();
    expect(result).to.be.deep.equal(expectedResult);
  });

  it('usage', async () => {
    nock(baseUrl)
      .get('/v1.0/usage')
      .query({ apikey })
      .reply(200, expectedResult);

    const result = await sc.usage();
    expect(result).to.be.deep.equal(expectedResult);
  });

  it('quota', async () => {
    nock(baseUrl)
      .get('/v1.0/quota')
      .query({ apikey })
      .reply(200, expectedResult);

    const result = await sc.quota();
    expect(result).to.be.deep.equal(expectedResult);
  });

  it('status', async () => {
    nock(baseUrl)
      .get('/v1.0/status')
      .query({ apikey })
      .reply(200, expectedResult);

    const result = await sc.status();
    expect(result).to.be.deep.equal(expectedResult);
  });
});
