import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class ItemService {
  constructor(private http: Http) { }

  //The token is passed in as a URL parameter and decoded server-side by express
  //middleware.
  getItems() {
    const token = localStorage.getItem('token')
    ? '?token=' + localStorage.getItem('token')
    : '';
    return this.http.get(`${environment.BASE_URL}item` + token)
    .map((res) => res.json());
  }

  getItem(id) {
    const token = localStorage.getItem('token')
    ? '?token=' + localStorage.getItem('token')
    : '';
    return this.http.get(`${environment.BASE_URL}item/${id}/` + token)
    .map((res) => res.json())
  }

  createItem(item) {
    const token = localStorage.getItem('token')
    ? '?token=' + localStorage.getItem('token')
    : '';
    this.http.post(`${environment.BASE_URL}item` + token, item)
    .subscribe(res => res.json())
  }

  getItemsInList(id) {
    const token = localStorage.getItem('token')
    ? '?token=' + localStorage.getItem('token')
    : '';
    return this.http.get(`${environment.BASE_URL}list/${id}/excludes` + token)
    .map((res) => res.json())
  }

  deleteItem(id) {
    const token = localStorage.getItem('token')
    ? '?token=' + localStorage.getItem('token')
    : '';
    this.http.delete(`${environment.BASE_URL}item/${id}` + token)
    .subscribe(res => res.json())
  }
}