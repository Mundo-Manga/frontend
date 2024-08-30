import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CRUDProductService {
  private url = 'https://ecomerce-server-h4o0.onrender.com/api/product';
  constructor(private http: HttpClient) {}
  getCode(): Observable<any> {
    return this.http.get(`${this.url}/getCode`);
  }
  addProduct(form: any): Observable<any> {
    return this.http.post(`${this.url}/addProduct`, form);
  }
  getProduct(indexPage: number): Observable<any> {
    return this.http.get(`${this.url}/getProducto`, {
      params: { page: indexPage },
    });
  }
  deleteProduct(codeDelete: string): Observable<any> {
    return this.http.delete(`${this.url}/deleteProduct`, {
      params: { code: codeDelete },
    });
  }
}
