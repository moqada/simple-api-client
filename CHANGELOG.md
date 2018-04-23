<a name="0.5.0"></a>
# [0.5.0](https://github.com/moqada/simple-api-client/compare/v0.4.0...v0.5.0) (2018-04-23)


### Bug Fixes

* **typescript:** Change module export styles ([fbde13b](https://github.com/moqada/simple-api-client/commit/fbde13b))


### BREAKING CHANGES

* **typescript:** Module import styles changed for JavaScript and TypeScript.

JavaScript

```javascript
// before
const SimpleAPIClient = require('@moqada/simple-api-client');
const SimpleAPIClient from '@moqada/simple-api-client';

// after: changed in require style
const {SimpleAPIClient} = require('@moqada/simple-api-client');
// after: not changed in import style
const SimpleAPIClient from '@moqada/simple-api-client';
```

TypeScript

```
// before
import SimpleAPIClient from '@moqada/simple-api-client';

// after
import {SimpleAPIClient} from '@moqada/simple-api-client';
```



<a name="0.4.0"></a>
# [0.4.0](https://github.com/moqada/simple-api-client/compare/v0.3.1...v0.4.0) (2018-04-17)


### Features

* **sac:** Support TypeScript ([2750750](https://github.com/moqada/simple-api-client/commit/2750750))



<a name="0.3.1"></a>
## [0.3.1](https://github.com/moqada/simple-api-client/compare/v0.3.0...v0.3.1) (2017-09-05)

### Chores

* **chore(esdoc):** Migrate ESDoc settings to v1.0 ([ecafa98](https://github.com/moqada/simple-api-client/commit/ecafa98))



<a name="0.3.0"></a>
# [0.3.0](https://github.com/moqada/simple-api-client/compare/v0.2.0...v0.3.0) (2017-09-05)


### Features

* **simple-api-client:** Change endpoint and timeout settings to instance properties ([56b54e6](https://github.com/moqada/simple-api-client/commit/56b54e6))


### BREAKING CHANGES

* **simple-api-client:** Replace endpoint and timeout from class properties to instance properties.



<a name="0.2.0"></a>
# [0.2.0](https://github.com/moqada/simple-api-client/compare/v0.1.1...v0.2.0) (2016-09-09)


### Features

* **simple-api-client:** Add timeout option ([cd3aafa](https://github.com/moqada/simple-api-client/commit/cd3aafa))



<a name="0.1.1"></a>
## [0.1.1](https://github.com/moqada/simple-api-client/compare/v0.1.0...v0.1.1) (2016-07-12)


### Bug Fixes

* Fix broken Flow 0.27 or later ([#14](https://github.com/moqada/simple-api-client/pull/14))
