import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private url = 'http://localhost:3000/api/user';
  constructor(private http: HttpClient) {}
  getUsers(indexPage: number): Observable<any> {
    return this.http.get(`${this.url}/getUsers`, {
      params: { page: indexPage },
    });
  }
}
