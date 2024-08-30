import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private url = 'https://ecomerce-server-h4o0.onrender.com/api/order';

  constructor(private http: HttpClient) {}
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
  getOrder(): Observable<any> {
    return this.http.get(`${this.url}/getOrder`);
  }
  getCountOrder(): Observable<any> {
    return this.http.get(`${this.url}/countOrder`);
  }

  confirmOrder(id: number): Observable<any> {
    return this.http.get(`${this.url}/confirmOrder`, {
      params: { idOrder: id },
    });
  }
  deleteOrder(id: number): Observable<any> {
    return this.http.delete(`${this.url}/deleteOrder`, {
      params: { idOrder: id },
    });
  }
}
