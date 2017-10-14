import { Person } from './person';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PersonService {

  private _getUrl = '/api/person';
  private _postUrl = '/api/person';
  private _deleteUrl = '/api/person';
  private _updateUrl = '/api/person/';

  constructor(private _http: Http) { }
  getPersons() {
    return this._http.get(this._getUrl)
      .map((response: Response) => response.json());
  }
  addPerson(person: Person) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.post(this._postUrl, JSON.stringify(person), options)
      .map((response: Response) => response.json());
  }
  updatePerson(person: Person) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.put(this._updateUrl + person._id, JSON.stringify(person), options)
      .map((response: Response) => response.json());
  }
  deletePersons(person: Person) {
    return this._http.delete(this._deleteUrl + '/' + person._id)
      .map((response: Response) => response.json());
  }
}
