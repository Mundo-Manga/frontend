import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private url = 'http://localhost:3000/api/cart';

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
  createOrder(cartData: any, montoTotal: number): Observable<any> {
    return this.http.post(
      `${this.url}/createOrder`,
      {
        cartData,
        montoTotal,
      },
      { withCredentials: true }
    );
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
