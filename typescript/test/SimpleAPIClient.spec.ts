/* eslint-disable require-jsdoc */
import * as assert from 'assert';
import SimpleAPIClient from '@moqada/simple-api-client';

const ENDPOINT = 'http://localhost';
const HEADERS = {'X-Foo': 'xxxxx'};

type APIResponse = {
  error: Object;
  response: Object;
};

/**
 * Sample APIClient
 */
class SampleAPIClient extends SimpleAPIClient<APIResponse> {
  token: string;

  /**
   * constructor
   *
   * @param props - Props
   */
  constructor(props: {token: string}) {
    super({endpoint: ENDPOINT});
    this.token = props.token;
  }

  /**
   * getDefaultOptions
   */
  // eslint-disable-next-line class-methods-use-this
  getDefaultOptions() {
    return {headers: {'X-Default': 'yyyyyyy'}};
  }

  getFoo() {
    return this.get('/');
  }

  getFooWithParams(params: {limit?: number} = {}) {
    return this.get('/', {query: params});
  }

  patchFoo(data: {name: string}) {
    return this.patch('/', {data});
  }

  postFoo(data: {name: string}) {
    return this.post('/', {data});
  }

  putFoo(data: {name: string}) {
    return this.put('/', {data});
  }
}

describe('SimpleAPIClient', () => {
  it('constructor', () => {
    const timeout = 300;
    const client1 = new SimpleAPIClient({endpoint: ENDPOINT});
    assert(client1.endpoint === ENDPOINT);
    assert(client1.timeout === undefined);
    const client2 = new SimpleAPIClient({endpoint: ENDPOINT, timeout});
    assert(client2.endpoint === ENDPOINT);
    assert(client2.timeout === timeout);
  });

  it('#send()', async () => {
    const client = new SimpleAPIClient({endpoint: ENDPOINT});
    const data = {foo: 'bar'};
    const query = {bar: 'foo'};
    await client.send('post', '/');
    await client.send('post', '/', {data});
    await client.send('post', '/', {query});
    await client.send('post', '/', {headers: HEADERS});
    await client.send('post', '/', {data, headers: HEADERS});
    const res = await client.send('post', '/', {headers: HEADERS, query});
    assert(res.response);
    assert(res.error);
  });

  it('#get()', async () => {
    const client = new SimpleAPIClient({endpoint: ENDPOINT});
    const query = {foo: 'bar'};
    await client.get('/');
    await client.get('/', {query});
    const res = await client.get('/', {headers: HEADERS, query});
    assert(res.response);
    assert(res.error);
  });

  it('#patch()', async () => {
    const client = new SimpleAPIClient({endpoint: ENDPOINT});
    const data = {foo: 'bar'};
    await client.patch('/');
    await client.patch('/', {data});
    const res = await client.patch('/', {data, headers: HEADERS});
    assert(res.response);
    assert(res.error);
  });

  it('#post()', async () => {
    const client = new SimpleAPIClient({endpoint: ENDPOINT});
    const data = {foo: 'bar'};
    await client.post('/');
    await client.post('/', {data});
    const res = await client.post('/', {data, headers: HEADERS});
    assert(res.response);
    assert(res.error);
  });

  it('#put()', async () => {
    const client = new SimpleAPIClient({endpoint: ENDPOINT});
    const data = {foo: 'bar'};
    await client.put('/');
    await client.put('/', {data});
    const res = await client.put('/', {data, headers: HEADERS});
    assert(res.response);
    assert(res.error);
  });
});

describe('SampleAPIClient', () => {
  it('etc', async () => {
    const client = new SampleAPIClient({token: 'xxxxx'});
    const res = await client.getFoo();
    assert(res.response);
  });
});
