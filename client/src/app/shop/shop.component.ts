import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../models/brand';
import { IProduct } from '../models/product';
import { IType } from '../models/productType';
import { ShopParams } from '../models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', {static: false}) searchTerm: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  shopParams: ShopParams;
  totalCount = 1;
  sortOptions = [
    { name: 'Alphabetical', value: 'name'},
    { name: 'Price: Low to High', value: 'priceAsc'},
    { name: 'Price: High to Low', value: 'priceDesc'}
  ];

  constructor(private shopService: ShopService) {
    this.shopParams = shopService.shopParams;
   }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(){
    this.shopService.getProducts().subscribe(response => {
      this.products = response.data;
      this.totalCount = response.count;
    }, error => {
      console.log(error);
    });
  }

  getBrands(){
    this.shopService.getBrands().subscribe(response => {
      this.brands = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  getTypes(){
    this.shopService.getTypes().subscribe(response => {
      this.types = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  onBrandSelected(brandId: number) {
    this.shopService.shopParams.brandId = brandId;
    this.updateShopParams();
    this.resetPageNumber();
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopService.shopParams.typeId = typeId;
    this.updateShopParams();
    this.resetPageNumber();
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopService.shopParams.sort = sort;
    this.updateShopParams();
    this.getProducts();
  }

  onPageChanged(event: number) {
    if (this.shopService.shopParams.pageNumber !== event) {
      this.shopService.shopParams.pageNumber = event;
      this.updateShopParams();
      this.getProducts();
    }
  }

  isEmptyProductsList(): boolean {
    return !this.totalCount;
  }

  onSearch() {
    this.shopService.shopParams.search = this.searchTerm.nativeElement.value;
    this.updateShopParams();
    this.resetPageNumber();
    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopService.shopParams = new ShopParams();
    this.updateShopParams();
    this.getProducts();
  }

  private resetPageNumber() {
    this.shopService.shopParams.pageNumber = 1;
    this.updateShopParams();
  }

  private updateShopParams() {
    this.shopParams = this.shopService.shopParams;
  }
}
