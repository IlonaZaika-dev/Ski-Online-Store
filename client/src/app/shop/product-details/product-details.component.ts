import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private shopService: ShopService, 
    private activatedRout: ActivatedRoute, 
    private brService: BreadcrumbService) { }

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
}
