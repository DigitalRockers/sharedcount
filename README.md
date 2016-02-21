#SharedCount

[![Build Status via Travis CI](https://travis-ci.org/DigitalRockers/sharedcount.svg?branch=master)](https://travis-ci.org/DigitalRockers/sharedcount)
[![NPM version](http://img.shields.io/npm/v/sharedcount.svg)](https://www.npmjs.org/package/sharedcount)

[SharedCount](sharedcount.com) module for [nodejs](nodejs.org)

SharedCount API documentation: [http://docs.sharedcount.com](http://docs.sharedcount.com/)

This software is released under the MIT license. See `LICENSE` for more details

## Download and Installation

From the command line

	$ npm install sharedcount

package.json

	dependencies: {
      ...
      "sharedcount": "*$version*",
      ...
    }
    ...

## Example use

```javascript
var SharedCount = require('sharedcount');

var sc = new SharedCount({ apiKey: 'YOUR_API_KEY' });

sc.url({url: 'www.yahoo.com'}, function(error, results){
	if(error) return console.error(error);
	
	...
});
```

## Documentation

Initialize SharedCount object:
```javascript
var SharedCount = require('sharedcount');
var sc = new SharedCount({
	apiKey: 'YOUR_API_KEY' || process.env.SharedcountApiKey
	debug: false //optional
});
```

### url(url, callback)
Return share counts for a URL.

```javascript
sc.url('sharedcount.com', function(error, results){
	if(error) return console.error(error);

	...
});

//custom_ttl available only on Dedicated plans
sc.url({url: 'sharedcount.com', custom_ttl: 600}, function(error, results){
	if(error) return console.error(error);

	...
});
```

### bulk(options, callback)
Get a large number of recently-posted URLs all at once to calculate bulk social counts.

This method call `POST /bulk` and `GET /bulk` endpoint
```javascript
sc.bulk({
		urls: ['sharedcount.com', 'google.com', 'yahoo.com'],
		force: 1 //optional, Set this parameter to 1 force results to return even if not all URLs have completed processing.
	}, function(error, results){
	if(error) return console.error(error);

	...
});
```
### quota(callback)
Return information about your quota allocation for the day.

 ```javascript
sc.quota(function(error, results){
	if(error) return console.error(error);

	...
});
```

### usage(callback)
Return historical quota usage information.

```javascript
sc.usage(function(error, results){
	if(error) return console.error(error);

	...
});
```

### domain_whitelist(callback)
Return a list of domains added to your domain whitelist, and whether the domain whitelist is currently being enforced.

```javascript
sc.domainWhitelist(function(error, results){
	if(error) return console.error(error);

	...
});
```

### status(callback)
Check to see if the SharedCount API is currently up.

```javascript
sc.status(function(error, results){
	if(error) return console.error(error);

	...
});
```

LICENSE
---
The MIT License (MIT)

Copyright (c) 2015 Digital Rockers s.r.l.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
