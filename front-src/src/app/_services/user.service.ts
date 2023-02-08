import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user.interface';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

const API_URL = 'http://127.0.0.1:8080/api/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }
  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }
  getUsers() {
    return this.http.get(API_URL + 'users');
  }
  addFriend(username: string, friendname: string) {
    return this.http.post<User>(API_URL + 'user/addFriend', { username, friendname });
  }
  delFriend(username: string, friendname: string) {
    return this.http.post<User>(API_URL + 'user/delFriend', { username, friendname });
  }
}