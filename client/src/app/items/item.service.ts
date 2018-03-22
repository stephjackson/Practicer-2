import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';

@Injectable()
export class ItemService {
  BASE_URL: string = 'http://localhost:3000/';
  constructor(private http: Http) { }

  //The token is passed in as a URL parameter and decoded server-side by express
  //middleware.
  getItems() {
    const token = localStorage.getItem('token')
    ? '?token=' + localStorage.getItem('token')
    : '';
    return this.http.get(`${this.BASE_URL}item` + token)
    .map((res) => res.json());
  }

  getItem(id) {
    const token = localStorage.getItem('token')
    ? '?token=' + localStorage.getItem('token')
    : '';
    return this.http.get(`${this.BASE_URL}item/${id}/` + token)
    .map((res) => res.json())
  }

  createItem(item) {
    const token = localStorage.getItem('token')
    ? '?token=' + localStorage.getItem('token')
    : '';
    this.http.post(`${this.BASE_URL}item` + token, item)
    .subscribe(res => res.json())
  }

  getItemsInList(id) {
    const token = localStorage.getItem('token')
    ? '?token=' + localStorage.getItem('token')
    : '';
    return this.http.get(`${this.BASE_URL}list/${id}/excludes` + token)
    .map((res) => res.json())
  }

  deleteItem(id) {
    const token = localStorage.getItem('token')
    ? '?token=' + localStorage.getItem('token')
    : '';
    this.http.delete(`${this.BASE_URL}item/${id}` + token)
    .subscribe(res => res.json())
  }
}