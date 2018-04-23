/* eslint-disable require-jsdoc */
declare module '@moqada/simple-api-client' {
  export type APIOption = {
    data?: {[key: string]: any};
    query?: {[key: string]: any};
    headers?: {[key: string]: string};
  };

  type Props = {
    endpoint: string;
    timeout?: number;
  };

  export class SimpleAPIClient<APIResponse = {error: any; response: any}> {
    endpoint: string;
    timeout: number | void;

    constructor(props: Props);
    getDefaultOptions(): APIOption;
    toResponse(error: any, response: any): APIResponse;
    send(method: string, path: string, options?: APIOption): Promise<APIResponse>;
    delete(path: string, opts?: APIOption): Promise<APIResponse>;
    get(path: string, opts?: APIOption): Promise<APIResponse>;
    patch(path: string, opts?: APIOption): Promise<APIResponse>;
    put(path: string, opts?: APIOption): Promise<APIResponse>;
    post(path: string, opts?: APIOption): Promise<APIResponse>;
  }
}
