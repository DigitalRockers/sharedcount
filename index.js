var _ = require('lodash');
var util = require('util');
var eyes = require('eyes');
var request = require('request');

var Sharedcount = function(options) {
    if (!options)
        options = {};

    this.apiKey = options.apiKey || process.env.SharedcountApiKey;
    this.baseUrl = options.baseUrl || 'https://free.sharedcount.com';

    if (options.debug) {
        this.debug = true;
        this.__inspect = eyes.inspector({ maxLength: false, stream: null });
    }

    return this;
};


Sharedcount.prototype.__baseCall = function(url, options, callback) {
    if (!callback) {
        callback = options;
        options = {};
    }

    var self = this,
        path = this.baseUrl + url;

    var query = _.merge({ apikey: this.apiKey }, options);

    var t = Date.now();
    request({ url: path, qs: query }, function(error, response, body) {
        self.__debug('GET - ' + path + ' - ' + (Date.now() - t) + ' ms');
        if (error) return callback(error);

        var json = JSON.parse(body);

        self.__debugInspect(json);

        callback(null, json);
    });
};


/**
 * Call Url API Action
 *
 * @param options    Object        options object (url field required)
 * @param callback    function    callback function called with two parameters err, result
 */
Sharedcount.prototype.url = function(options, callback) {
    if (typeof(options) === 'string')
        options = { url: options };
    if (options.url.indexOf('http') === -1)
        options.url = 'http://' + options.url;
    this.__baseCall('/url', options, callback);
};

/**
 * Call Bulk API Action
 *
 * @param options    Object        options object (urls field required)
 * @param callback    function    callback function called with two parameters err, result
 */
Sharedcount.prototype.bulk = function(options, callback) {
    if (!callback) {
        callback = options;
        options = {};
    }

    var self = this,
        path = this.baseUrl + '/bulk?apikey=' + this.apiKey,
        body = '';
    for (var i = 0; i < options.urls.length; i++) {
        if (options.urls[ i ].indexOf('http') === -1)
            options.urls[ i ] = 'http://' + options.urls[ i ];
        body += options.urls[ i ] + '\n';
    }

    var t = Date.now();
    request({ url: path, body: body, method: 'POST' }, function(error, response, body) {
        self.__debug('POST - ' + path + ' - ' + (Date.now() - t) + ' ms');
        if (error) return callback(error);

        var json = JSON.parse(body);

        self.__debugInspect(json);

        if (json.Error) return callback(new Error(json.Error));

        var bulkId = json.bulk_id;

        self.__baseCall('/bulk', _.merge(options, { bulk_id: bulkId }), callback);
    });
};

/**
 * Call Quota API Action
 *
 * @param callback    function    callback function called with two parameters err, result
 */
Sharedcount.prototype.usage = function(options, callback) {
    this.__baseCall('/usage', options, callback);
};

/**
 * Call Usage API Action
 *
 * @param callback    function    callback function called with two parameters err, result
 */
Sharedcount.prototype.quota = function(options, callback) {
    this.__baseCall('/quota', options, callback);
};

/**
 * Call Domain Whitelist API Action
 *
 * @param callback    function    callback function called with two parameters err, result
 */
Sharedcount.prototype.domainWhitelist = function(options, callback) {
    this.__baseCall('/domain_whitelist', options, callback);
};

/**
 * Call Status API Action
 *
 * @param callback    function    callback function called with two parameters err, result
 */
Sharedcount.prototype.status = function(options, callback) {
    this.__baseCall('/status', options, callback);
};


/**  Debug  **/
Sharedcount.prototype.__debug = function(str) {
    if (this.debug)
        console.log('Sharedcount - ' + new Date().toISOString() + ' - ' + str);
};

Sharedcount.prototype.__debugInspect = function(str, obj) {
    if (this.debug) {
        if (obj)
            console.log('Sharedcount - ' + new Date().toISOString() + ' - ' + str + ' - ' + this.__inspect(obj));
        else
            console.log('Sharedcount - ' + new Date().toISOString() + ' - ' + this.__inspect(str));
    }
};


module.exports = Sharedcount;
