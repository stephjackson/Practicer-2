import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class ListService {
  //The BASE_URL thing came from Ironhack, but breaks on Heroku.
  //Hilariously, if you leave this in, Heroku will communicate with a local
  //Express server on port 3000. It's fixed on deployment by changing the url to '/'.
  BASE_URL: string = '/';
  constructor(private http: Http) { }

  getLists() {
    const token = localStorage.getItem('token')
    ? '?token=' + localStorage.getItem('token')
    : '';
    return this.http.get(`${environment.BASE_URL}list` + token)
    .map((res) => res.json());
  }

  createList(list) {
    const token = localStorage.getItem('token')
    ? '?token=' + localStorage.getItem('token')
    : '';
    this.http.post(`${environment.BASE_URL}list` + token, list)
    .subscribe(res => res.json())
  }

  getItemsInList(id) {
    const token = localStorage.getItem('token')
    ? '?token=' + localStorage.getItem('token')
    : '';
    return this.http.get(`${environment.BASE_URL}list/${id}` + token)
    .map((res) => res.json())
  }

  getItemsNotInList(id) {
    const token = localStorage.getItem('token')
    ? '?token=' + localStorage.getItem('token')
    : '';
    return this.http.get(`${environment.BASE_URL}list/${id}/excludes` + token)
    .map((res) => res.json())
  }

  addItemToList(listid, itemid) {
    const token = localStorage.getItem('token')
    ? '?token=' + localStorage.getItem('token')
    : '';
    this.http.patch(`${environment.BASE_URL}item/add/${listid}/${itemid}` + token, {})
    .subscribe(res => res.json())
  }

  removeItemFromList(listid, itemid) {
    const token = localStorage.getItem('token')
    ? '?token=' + localStorage.getItem('token')
    : '';
    this.http.patch(`${environment.BASE_URL}item/remove/${listid}/${itemid}` + token, {})
    .subscribe(res => res.json())
  }

  deleteList(id) {
    const token = localStorage.getItem('token')
    ? '?token=' + localStorage.getItem('token')
    : '';
    this.http.delete(`${environment.BASE_URL}list/${id}` + token)
    .subscribe(res => res.json())
  }

  statTrack(id, completed, bpm) {
    const token = localStorage.getItem('token')
    ? '?token=' + localStorage.getItem('token')
    : '';
    this.http.put(`${environment.BASE_URL}item/${id}/track/${completed}/${bpm}` + token, {})
    .subscribe(res => res.json())
  }
}
