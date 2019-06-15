# SharedCount

[![Build Status via Travis CI](https://travis-ci.org/DigitalRockers/sharedcount.svg?branch=master)](https://travis-ci.org/DigitalRockers/sharedcount)
[![NPM version](http://img.shields.io/npm/v/sharedcount.svg)](https://www.npmjs.org/package/sharedcount)

[SharedCount](sharedcount.com) module for [nodejs](nodejs.org)

SharedCount API documentation: [http://docs.sharedcount.com](http://docs.sharedcount.com/)

This software is released under the MIT license. See `LICENSE` for more details

## Download and Installation

From the command line

	$ yarn install sharedcount

or

	$ npm install sharedcount


## Example use

```javascript
var SharedCount = require('sharedcount');

var sc = new SharedCount({ apikey: 'YOUR_API_KEY' });

const result = await sc.url('www.yahoo.com')}
```

## Documentation

Initialize SharedCount object:
```javascript
var SharedCount = require('sharedcount');
var sc = new SharedCount({
	apiKey: 'YOUR_API_KEY' || process.env.SharedcountApiKey,
});
```

### url(url)
Resolve with share counts for a URL.

```javascript
sc.url('sharedcount.com')
```

### quota()
Resolve with information about your quota allocation for the day.

 ```javascript
sc.quota();
```

### usage()
Resolve with historical quota usage information.

```javascript
sc.usage();
```

### domain_whitelist()
Resolve with a list of domains added to your domain whitelist, and whether the domain whitelist is currently being enforced.

```javascript
sc.domainWhitelist();
```

### status()
Check to see if the SharedCount API is currently up.

```javascript
sc.status();
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
