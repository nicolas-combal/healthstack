import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_API_URL = "http://localhost:8000/auth/users";

  constructor(private http: HttpClient) {

  }

  checkAuth() {
    return this.http.get(this.AUTH_API_URL + '/check', { withCredentials: true });
  }

  login(username: string, password: string){
    return this.http.post(this.AUTH_API_URL + "/login", {username: username, password: password}, { withCredentials: true });
  }

  logout() {
    return this.http.get(this.AUTH_API_URL + "/logout", { withCredentials: true });
  }
}
