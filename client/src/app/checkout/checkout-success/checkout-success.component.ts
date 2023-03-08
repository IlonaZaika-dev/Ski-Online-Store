import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.scss']
})
export class CheckoutSuccessComponent implements OnInit {
  currentState$: Observable<any>;
  order: Order;
  
  constructor(private router: Router, public route: ActivatedRoute) {
    this.order = this.router.getCurrentNavigation().extras.state as Order;
   }

  ngOnInit(): void {
    // this.currentState$ = this.route.paramMap.pipe(
    //   map(() => window.history.state.order.queryParams)
    // ); 
  }

  viewOrder() {
    if (this.order) {
      this.router.navigate(['orders', this.order.id]);
    } else {
      this.router.navigate(['orders']);
    }
  }

}
