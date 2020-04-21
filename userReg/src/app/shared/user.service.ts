import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    fullName: '',
    email: '',
    password: ''
  };

  // tslint:disable-next-line: object-literal-key-quotes
  noAuthHeader = { headers: new HttpHeaders({'noauth': 'True' }) };

  readonly baseURL = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  postUser(user: User) {
    return this.http.post(this.baseURL + '/register', user, this.noAuthHeader);
  }

  login(authCrediential) {
    return this.http.post(this.baseURL + '/authenticate', authCrediential, this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(this.baseURL + '/userprofile');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    // tslint:disable-next-line: prefer-const
    let token = this.getToken();
    if (token) {
      // tslint:disable-next-line: prefer-const
      let userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else {
    return null;
    }
  }

  isLogIn() {
    // tslint:disable-next-line: prefer-const
    // tslint:disable-next-line: no-var-keyword
    // tslint:disable-next-line: prefer-const
    var userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    }
  }
}
