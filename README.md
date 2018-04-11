# simple-api-client

[![Greenkeeper badge](https://badges.greenkeeper.io/moqada/simple-api-client.svg)](https://greenkeeper.io/)

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][codecov-image]][codecov-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![DevDependency Status][daviddm-dev-image]][daviddm-dev-url]
[![License][license-image]][license-url]

Simple API Client for JavaScript.

***WIP***

## Installation

```
npm install --save @moqada/simple-api-client
```

## Usage

```javascript
import SimpleAPIClient from '@moqada/simple-api-client';

class APIClinet extends SimpleAPIClient {

  constructor({token, custom}: {token: string, custom: string}) {
    super({endpoint: 'http://api.example.com/v1'});
    this.token = token;
    this.custom = custom;
  }

  getDefaultOptions(): Object {
    return {
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'X-Custom-Header': `${this.custom}`
      }
    };
  }

  toResponse(error: ?Object, response: ?Object): Object {
    if (error) {
      return {error};
    }
    return {
      body: response.body
    };
  }

  getUsers(query): Promise<{body: Object}, {error: Object}> {
    return this.get('/users', {query});
  }
}

const clinet = new APIClinet({token: 'xxxxxxxyyyyy', custom: 'foobar'});
client.getUsers({offset: 20, limit: 10}).then(({body}) => {
  console.log(body);
}).catch(({error}) => {
  console.error(error);
}):
```

## Todo

- [ ] Test
- [x] Support TypeScript (experimental)

## Related

- [@moqada/simple-api-client-generator](https://github.com/moqada/simple-api-client-generator) - A CLI generating API Client from JSON Hyper Schema


[npm-url]: https://www.npmjs.com/package/@moqada/simple-api-client
[npm-image]: https://img.shields.io/npm/v/@moqada/simple-api-client.svg?style=flat-square
[travis-url]: https://travis-ci.org/moqada/simple-api-client
[travis-image]: https://img.shields.io/travis/moqada/simple-api-client.svg?style=flat-square
[daviddm-url]: https://david-dm.org/moqada/simple-api-client
[daviddm-image]: https://img.shields.io/david/moqada/simple-api-client.svg?style=flat-square
[daviddm-dev-url]: https://david-dm.org/moqada/simple-api-client#info=devDependencies
[daviddm-dev-image]: https://img.shields.io/david/dev/moqada/simple-api-client.svg?style=flat-square
[codecov-url]: https://codecov.io/github/moqada/simple-api-client
[codecov-image]: https://img.shields.io/codecov/c/github/moqada/simple-api-client.svg?style=flat-square
[license-url]: http://opensource.org/licenses/MIT
[license-image]: https://img.shields.io/github/license/moqada/simple-api-client?style=flat-square
