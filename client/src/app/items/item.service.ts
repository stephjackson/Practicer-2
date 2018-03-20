import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';

@Injectable()
export class ItemService {
  BASE_URL: string = 'http://localhost:3000';
  constructor(private http: Http) { }

  getItems() {
    console.log('hi');
    const token = localStorage.getItem('token')
    ? '?token=' + localStorage.getItem('token')
    : '';
    return this.http.get(`${this.BASE_URL}/item` + token)
    .map((res) => res.json());
  }

  createList(list) {
    const token = localStorage.getItem('token')
    ? '?token=' + localStorage.getItem('token')
    : '';
    this.http.post(`${this.BASE_URL}/list` + token, list)
    .subscribe(res => res.json())
  }

  getItemsInList(id) {
    const token = localStorage.getItem('token')
    ? '?token=' + localStorage.getItem('token')
    : '';
    return this.http.get(`${this.BASE_URL}/list/${id}` + token)
    .map((res) => res.json())
  }

  deleteList(id) {
    const token = localStorage.getItem('token')
    ? '?token=' + localStorage.getItem('token')
    : '';
    this.http.delete(`${this.BASE_URL}/list/${id}` + token)
    .subscribe(res => res.json())
  }
}