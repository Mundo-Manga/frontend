import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private url = 'https://ecomerce-server-h4o0.onrender.com/api/user';
  constructor(private http: HttpClient) {}
  getUsers(indexPage: number): Observable<any> {
    return this.http.get(`${this.url}/getUsers`, {
      params: { page: indexPage },
    });
  }
  logout(): Observable<any> {
    return this.http.get(`${this.url}/logout`, {
      withCredentials: true,
    });
  }
  getRole(): Observable<any> {
    return this.http.post(
      `${this.url}/getRole`,
      { h: 'f' },
      {
        withCredentials: true,
      }
    );
  }
}
