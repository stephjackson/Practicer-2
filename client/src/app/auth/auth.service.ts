import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { User } from "./user.model";

@Injectable()
export class AuthService {
  constructor(private http: Http) {}

  //These are a bit dated - I think the new HttpClientModule can handle
  //the body and headers in a nicer way for you.
  signup(user: User) {
      const body = JSON.stringify(user);
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.post('http://localhost:3000/user', body, {headers: headers})
          .map((response: Response) => response.json())
          .catch((error: Response) => Observable.throw(error.json()));
  }

  signin(user: User) {
      const body = JSON.stringify(user);
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.post('http://localhost:3000/user/signin', body, {headers: headers})
          .map((response: Response) => response.json())
          .catch((error: Response) => Observable.throw(error.json()));
  }

  //Nice thing about using a token locally is logging out just entails deleting the token.
  logout() {
      localStorage.clear();
  }

  //And checking login status is just a simple comparison.
  isLoggedIn() {
      return localStorage.getItem('token') !== null;
  }
}
