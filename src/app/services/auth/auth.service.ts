import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'https://ecomerce-server-h4o0.onrender.com/api/auth';

  constructor(private http: HttpClient) {}

  login(form: any): Observable<any> {
    return this.http.post(`${this.url}/login`, form, { withCredentials: true });
  }
  signUp(form: any): Observable<any> {
    return this.http.post(`${this.url}/register`, form, {
      withCredentials: true,
    });
  }
}
