import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {CheckAuthApiResponse} from '../../interfaces/auth-interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_API_URL = "http://localhost:8000/auth/users";

  constructor(private http: HttpClient) {

  }

  checkAuth() {
    return this.http.get<CheckAuthApiResponse>(this.AUTH_API_URL + '/check', { withCredentials: true });
  }

  signup(username: string, password: string, email: string, role: string){
    return this.http.post(this.AUTH_API_URL + "/signup", {username: username, password: password, email: email, role: role}, { withCredentials: true });
  }

  login(username: string, password: string){
    return this.http.post(this.AUTH_API_URL + "/login", {username: username, password: password}, { withCredentials: true });
  }

  logout() {
    return this.http.get(this.AUTH_API_URL + "/logout", { withCredentials: true });
  }
}
