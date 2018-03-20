// import { Http, Response, Headers } from "@angular/http";
// import { Injectable, EventEmitter } from "@angular/core";
// import 'rxjs/Rx';
// import { Observable } from "rxjs";

// import { List } from "./list.model";

// @Injectable()
// export class listService {
//     private lists: List[] = [];
//     listIsEdit = new EventEmitter<List>();

//     constructor(private http: Http) {
//     }

//     addList(list: List) {
//         const body = JSON.stringify(List);
//         const headers = new Headers({'Content-Type': 'application/json'});
//         const token = localStorage.getItem('token')
//             ? '?token=' + localStorage.getItem('token')
//             : '';
//         return this.http.post('http://localhost:3000/list' + token, body, {headers: headers})
//             .map((response: Response) => {
//                 const result = response.json();
//                 const list = new List(
//                     result.obj.title,
//                     result.obj._id,
//                     result.obj.user._id);
//                 this.lists.push(List);
//                 return list;
//             })
//             .catch((error: Response) => Observable.throw(error.json()));
//     }

//     getLists() {
//         return this.http.get('http://localhost:3000/list')
//             .map((response: Response) => {
//                 const lists = response.json().obj;
//                 let transformedLists: List[] = [];
//                 for (let list of lists) {
//                     transformedLists.push(new List(
//                       list.obj.title,
//                       list.obj._id,
//                       list.obj.user._id)
//                     );
//                 }
//                 this.lists = transformedLists;
//                 return transformedLists;
//             })
//             .catch((error: Response) => Observable.throw(error.json()));
//     }

//     editList(list: List) {
//         this.listIsEdit.emit(list);
//     }

//     updateList(list: List) {
//         const body = JSON.stringify(list);
//         const headers = new Headers({'Content-Type': 'application/json'});
//         const token = localStorage.getItem('token')
//             ? '?token=' + localStorage.getItem('token')
//             : '';
//         return this.http.patch('http://localhost:3000/list/' + list.listId + token, body, {headers: headers})
//             .map((response: Response) => response.json())
//             .catch((error: Response) => Observable.throw(error.json()));
//     }

//     deleteList(list: List) {
//         this.lists.splice(this.lists.indexOf(list), 1);
//         const token = localStorage.getItem('token')
//             ? '?token=' + localStorage.getItem('token')
//             : '';
//         return this.http.delete('http://localhost:3000/list/' + list.listId + token)
//             .map((response: Response) => response.json())
//             .catch((error: Response) => Observable.throw(error.json()));
//     }
// }

import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';

@Injectable()
export class ListService {
  BASE_URL: string = 'http://localhost:3000';
  constructor(private http: Http) { }

  getLists() {
    const token = localStorage.getItem('token')
    ? '?token=' + localStorage.getItem('token')
    : '';
    return this.http.get(`${this.BASE_URL}/list` + token)
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
