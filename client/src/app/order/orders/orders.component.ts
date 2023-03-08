import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    console.log("OrdersComponent");
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrdersList().subscribe({
      next: orders => {
        this.orders = orders;
        console.log(orders)
      }
    });
  }

}
