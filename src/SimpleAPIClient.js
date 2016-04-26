/* @flow */
import request from 'superagent';

export type APIOption = {
  data?: {[key: string]: any},
  query?: {[key: string]: any},
  headers?: {[key: string]: string}
};


/**
 * Simple API Client
 */
export default class SimpleAPIClient {

  static endpoint: string;

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
  toResponse(error: ?Object, response: ?Object): Object {
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
  send(method: string, path: string, options: APIOption = {}): Promise {
    const defaultOptions = this.getDefaultOptions();
    const headers = Object.assign({
      Accept: 'application/json'
    }, defaultOptions.headers || {}, options.headers || {});
    const data = Object.assign({}, defaultOptions.data || {}, options.data || {});
    const query = Object.assign({}, defaultOptions.query || {}, options.query || {});
    let req = request[method](`${this.constructor.endpoint}${path}`);

    Object.keys(headers).forEach(key => {
      req = req.set(key, headers[key]);
    });
    if (Object.keys(query).length) {
      req = req.query(query);
    }
    if (Object.keys(data).length) {
      req = req.send(data);
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
  delete(path: string, opts: APIOption = {}): Promise {
    return this.send('delete', path, opts);
  }

  /**
   * GET Request
   *
   * @param {string} path - url path
   * @param {Object} opts - options
   * @return {Promise<Object, Error>}
   */
  get(path: string, opts: APIOption = {}): Promise {
    return this.send('get', path, opts);
  }

  /**
   * PATCH Request
   *
   * @param {string} path - URL path
   * @param {APIOption} opts - options
   * @return {Promise<Object, Error>}
   */
  patch(path: string, opts: APIOption = {}): Promise {
    return this.send('patch', path, opts);
  }

  /**
   * PUT Request
   *
   * @param {string} path - URL path
   * @param {APIOption} opts - options
   * @return {Promise<Object, Error>}
   */
  put(path: string, opts: APIOption = {}): Promise {
    return this.send('put', path, opts);
  }

  /**
   * POST Request
   *
   * @param {string} path - URL path
   * @param {APIOption} opts - options
   * @return {Promise<Object, Error>}
   */
  post(path: string, opts: APIOption = {}): Promise {
    return this.send('post', path, opts);
  }
}
