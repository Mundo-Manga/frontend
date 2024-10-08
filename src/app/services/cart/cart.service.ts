import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private url = 'https://ecomerce-server-h4o0.onrender.com/api/cart';

  constructor(private http: HttpClient) {}

  addCart(code_producto: any, cantidad: number): Observable<any> {
    return this.http.post(
      `${this.url}/detailsCartAdd`,
      { code_producto, cantidad },
      {
        withCredentials: true,
      }
    );
  }
  deletProductCart(id: any): Observable<any> {
    return this.http.delete(`${this.url}/detailsCartDelete`, {
      params: {
        id_detailCart: id,
      },
    });
  }

  getCart(): Observable<any> {
    return this.http.post(
      `${this.url}/getCart`,
      { h: 'g' },
      {
        withCredentials: true,
      }
    );
  }
}
