import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasketItem } from 'src/app/models/basket';
import { IProduct } from 'src/app/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct;
  quantity = 1;

  constructor(private shopService: ShopService, 
              private activatedRout: ActivatedRoute, 
              private brService: BreadcrumbService,
              private basketService: BasketService) { }

  ngOnInit(): void {
    this.getProduct();
    this.brService.set('@productDetails', '');
  }

  getProduct() {
    this.shopService.getProduct(+this.activatedRout.snapshot.paramMap.get('id')).subscribe(product => 
      { 
        this.product = product; 
        this.brService.set('@productDetails', product.name);
      }, error => {
        console.log(error);
      });
  }

  addItemToBasket(item: IProduct) {
    this.basketService.addItemToBasket(item, this.quantity);
  }

  incrementItemQuantity() {
    this.quantity++;
  }

  decrementItemQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
