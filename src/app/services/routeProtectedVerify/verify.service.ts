import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VerifyService {
  private url = 'http://localhost:3000/api/verify';

  constructor(private http: HttpClient) {}
  verifyLogged(): Observable<boolean> {
    //Aca utilizo post, inicialmente probé con get pero no podía adquirir las cookies en el servidor, no se porque con post me funcionó
    //No pregunten porque todo esto, lo importante es que funciona XD
    return this.http
      .post<{ isLoggedIn: boolean }>(
        `${this.url}/logged`,
        { h: 'f' },
        { withCredentials: true }
      )
      .pipe(map((response) => response.isLoggedIn));
  }
  verifyRole(): Observable<boolean> {
    //Aca utilizo post, inicialmente probé con get pero no podía adquirir las cookies en el servidor, no se porque con post me funcionó
    //No pregunten porque todo esto, lo importante es que funciona XD
    return this.http
      .post<{ isLoggedIn: boolean }>(
        `${this.url}/role`,
        { h: 'f' },
        { withCredentials: true }
      )
      .pipe(map((response) => response.isLoggedIn));
  }
}
