import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../models/brand';
import { IPagination } from '../models/pagination';
import { IType } from '../models/productType';
import { map } from 'rxjs/operators';
import { ShopParams } from '../models/shopParams';
import { IProduct } from '../models/product';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private baseUrl = 'https://localhost:5001/api/';
  private products: IProduct[] = [];
  private brands: IBrand[] = [];
  private types: IType[] = [];
  private pagination?: IPagination;

  public shopParams = new ShopParams();

  constructor(private http: HttpClient) { }

  getProducts() {
    let params = new HttpParams();

    if(this.shopParams.brandId !== 0)
    {
      params = params.append('brandId', this.shopParams.brandId.toString());
    }

    if(this.shopParams.typeId !== 0)
    {
      params = params.append('typeId', this.shopParams.typeId.toString());
    }

    if(this.shopParams.search)
    {
      params = params.append('search', this.shopParams.search);
    }

    params = params.append('sort', this.shopParams.sort);
    params = params.append('pageSize', this.shopParams.pageSize.toString());
    params = params.append('pageIndex', this.shopParams.pageNumber.toString());

    return this.http.get<IPagination>(this.baseUrl + 'products',{observe: 'response', params})
      .pipe(
        map(response => {
          this.products = [...this.products, ...response.body.data];
          this.pagination = response.body;
          return response.body;
        })
      );
  }

  getProduct(id: number) {
    const product = this.products.find(p => p.id === id);

    if (product) return of(product);

    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }

  getBrands() {
    if (this.brands.length > 0) return of(this.brands);

    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands').pipe(
      map(brands => this.brands = brands)
    );
  }

  getTypes() {
    if (this.types.length > 0) return of(this.types);

    return this.http.get<IType[]>(this.baseUrl + 'products/types').pipe(
      map(types => this.types = types)
    );
  }
}
