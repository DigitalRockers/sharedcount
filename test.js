'use strict';

var should = require('should');

var Sharedcount = require('./index');

var sc = new Sharedcount({ debug: true });

describe('Sharedcount unit tests', function() {
    it('url', function(done) {
        sc.url({ url: 'gioel.com' }, function(err, res) {
            should.not.exist(err);
            should.exist(res);
            done();
        });
    });

    it('bulk', function(done) {
        sc.bulk({ urls: [ 'gioel.com', 'nike.it', 'google.com', 'yahoo.it' ] }, function(err, res) {
            should.exist(err);
            should.not.exist(res);
            done();
        });
    });

    it('quota', function(done) {
        sc.quota(function(err, res) {
            should.not.exist(err);
            should.exist(res);
            done();
        });
    });

    it('usage', function(done) {
        sc.usage(function(err, res) {
            should.not.exist(err);
            should.exist(res);
            done();
        });
    });

    it('domain_whitelist', function(done) {
        sc.domainWhitelist(function(err, res) {
            should.not.exist(err);
            should.exist(res);
            done();
        });
    });

    it('status', function(done) {
        sc.status(function(err, res) {
            should.not.exist(err);
            should.exist(res);
            done();
        });
    });
});
