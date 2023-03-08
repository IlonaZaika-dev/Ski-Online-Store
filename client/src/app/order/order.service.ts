import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getOrdersList() {
    return this.http.get<Order[]>(this.baseUrl + 'orders');
  }

  getOrder(orderId: number) {
    return this.http.get<Order>(this.baseUrl + 'orders/' + orderId);
  }
}
