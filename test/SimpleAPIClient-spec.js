/* @flow */
/* eslint-disable require-jsdoc, no-magic-numbers */
import assert from 'power-assert';
import nock from 'nock';
import SimpleAPIClient from '../src/SimpleAPIClient';

describe('SimpleAPIClient', () => {
  const endpoint = 'https://localhost';

  beforeEach(() => {
    nock(endpoint)
      .get('/items/idx')
      .reply(200, {id: 'idx', name: 'test name'})
      .post('/items')
      .reply(201, {id: 'idy', name: 'created name'});
  });
  afterEach(() => {
    nock.cleanAll();
  });

  it('is defined', () => {
    assert(SimpleAPIClient);
  });

  context('client without response type', () => {
    type ItemResource = {id: string, name: string};
    class SampleClient extends SimpleAPIClient {
      token: string;

      constructor({token}: {token: string}) {
        super({endpoint});
        this.token = token;
      }

      async getItem(id: string): Promise<{body: ItemResource}> {
        const {response} = await this.get(`/items/${id}`);
        return {body: response.body};
      }

      async createItem(params: {name: string}): Promise<{body: ItemResource}> {
        const {response} = await this.post('/items', {data: params});
        return {body: response.body};
      }
    }

    it('create client', async () => {
      const client = new SampleClient({token: 'xxxx'});
      const res1 = await client.getItem('idx');
      assert(res1.body.id === 'idx');
      const res2 = await client.createItem({name: 'created name'});
      assert(res2.body.id === 'idy');
    });
  });

  context('client with response type', () => {
    type ItemResource = {id: string, name: string};
    type APIResponse = {body: any, error: any, headers: any, status: number};
    class SampleClient extends SimpleAPIClient<APIResponse> {
      constructor() {
        super({endpoint});
      }

      // eslint-disable-next-line class-methods-use-this
      toResponse(error: any, response: any): APIResponse {
        return {
          body: response && response.body,
          error,
          headers: response && response.headers,
          status: response && response.status
        };
      }

      async getItem(id: string): Promise<{body: ItemResource, headers: Object}> {
        const {body, headers} = await this.get(`/items/${id}`);
        return {body, headers};
      }

      async createItem(params: {name: string}): Promise<{body: ItemResource, headers: Object}> {
        const {body, headers} = await this.post('/items', {data: params});
        return {body, headers};
      }
    }

    it('create client', async () => {
      const client = new SampleClient();
      const res1 = await client.getItem('idx');
      assert(res1.body.id === 'idx');
      const res2 = await client.createItem({name: 'created name'});
      assert(res2.body.id === 'idy');
    });
  });
});
