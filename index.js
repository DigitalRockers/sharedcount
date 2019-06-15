require('request').debug = true;
const request = require('request-promise-native');

const baseUrl = 'https://api.sharedcount.com/v1.0';

const addHttpToUrl = url => (url.includes('http') ? url : `http://${url}`);

const makeRequest = apikey => ({
  path = '', queryParams = {}, body, method = 'GET',
}) => request({
  url: `${baseUrl}${path}`,
  method,
  json: true,
  qs: { apikey, ...queryParams },
  body,
});

const Sharedcount = function Sharedcount(options = {}) {
  this.apikey = options.apikey || process.env.SHAREDCOUNT_API_KEY;
  this.makeRequest = makeRequest(this.apikey);
  return this;
};

Sharedcount.prototype.url = function urlInfo(url) {
  return this.makeRequest({ queryParams: { url: addHttpToUrl(url) } });
};

Sharedcount.prototype.domainWhitelist = function status() {
  return this.makeRequest({ path: '/domain_whitelist' });
};

Sharedcount.prototype.usage = function usage() {
  return this.makeRequest({ path: '/usage' });
};

Sharedcount.prototype.quota = function usage() {
  return this.makeRequest({ path: '/quota' });
};

Sharedcount.prototype.status = function status() {
  return this.makeRequest({ path: '/status' });
};

module.exports = Sharedcount;
