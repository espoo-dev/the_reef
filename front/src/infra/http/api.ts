import AxiosAdapter from './AxiosAdapter';
import Http from './http';

export class Api implements Http {
  private host = 'https://myreef.onrender.com';
  private adapter = new AxiosAdapter();

  async get<T>(url: string): Promise<T> {
    return this.adapter.get(this.host + url);
  }

  async post(url: string, data: any): Promise<any> {
    return this.adapter.post(this.host + url, data);
  }

  async put(url: string, data: any): Promise<void> {
    return this.adapter.put(this.host + url, data);
  }
}
