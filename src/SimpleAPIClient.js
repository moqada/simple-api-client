/* @flow */
/* eslint-disable class-methods-use-this */
import request from 'superagent';

export type APIOption = {
  data?: {[key: string]: any},
  headers?: {[key: string]: string},
  query?: {[key: string]: any}
};

/**
 * Simple API Client
 */
export class SimpleAPIClient<APIResponse: Object = {error: any, response: any}> {
  endpoint: string;
  timeout: ?number;

  /**
   * constructor
   *
   * @param {Object} props - props
   * @param {string} props.endpoint - API endpoint
   * @param {number} [props.timeout] - timeout seconds
   */
  constructor(props: {endpoint: string, timeout?: number}) {
    this.endpoint = props.endpoint;
    this.timeout = props.timeout;
  }

  /**
   * get default options
   *
   * @return {Object}
   */
  getDefaultOptions(): APIOption {
    return {};
  }

  /**
   * superagent response to custom response
   *
   * @param {Object|void} error - superagent response object
   * @param {Object|void} response - superagent response object
   * @return {Object}
   */
  toResponse(error: any, response: any): Object {
    return {error, response};
  }

  /**
   * Send Request
   *
   * @param {string} method - request method
   * @param {string} path - url path
   * @param {APIOption} options - options
   * @return {Promise<Object, Error>}
   */
  send(method: string, path: string, options: APIOption = {}): Promise<APIResponse> {
    const defaultOptions = this.getDefaultOptions();
    const headers = Object.assign(
      {Accept: 'application/json'},
      defaultOptions.headers || {},
      options.headers || {}
    );
    const data = Object.assign({}, defaultOptions.data || {}, options.data || {});
    const query = Object.assign({}, defaultOptions.query || {}, options.query || {});
    let req = request[method](`${this.endpoint}${path}`);

    Object.keys(headers).forEach(key => {
      req = req.set(key, headers[key]);
    });
    if (Object.keys(query).length) {
      req = req.query(query);
    }
    if (Object.keys(data).length) {
      req = req.send(data);
    }
    if (this.timeout) {
      req = req.timeout(this.timeout);
    }
    return new Promise((resolve, reject) => {
      req.end((err, res) => {
        const response = this.toResponse(err, res);
        if (err) {
          return reject(response);
        }
        return resolve(response);
      });
    });
  }

  /**
   * DELETE Request
   *
   * @param {string} path - url path
   * @param {Object} opts - options
   * @return {Promise<Object, Error>}
   */
  delete(path: string, opts: APIOption = {}): Promise<APIResponse> {
    return this.send('delete', path, opts);
  }

  /**
   * GET Request
   *
   * @param {string} path - url path
   * @param {Object} opts - options
   * @return {Promise<Object, Error>}
   */
  get(path: string, opts: APIOption = {}): Promise<APIResponse> {
    return this.send('get', path, opts);
  }

  /**
   * PATCH Request
   *
   * @param {string} path - URL path
   * @param {APIOption} opts - options
   * @return {Promise<Object, Error>}
   */
  patch(path: string, opts: APIOption = {}): Promise<APIResponse> {
    return this.send('patch', path, opts);
  }

  /**
   * PUT Request
   *
   * @param {string} path - URL path
   * @param {APIOption} opts - options
   * @return {Promise<Object, Error>}
   */
  put(path: string, opts: APIOption = {}): Promise<APIResponse> {
    return this.send('put', path, opts);
  }

  /**
   * POST Request
   *
   * @param {string} path - URL path
   * @param {APIOption} opts - options
   * @return {Promise<Object, Error>}
   */
  post(path: string, opts: APIOption = {}): Promise<APIResponse> {
    return this.send('post', path, opts);
  }
}
export default SimpleAPIClient;
