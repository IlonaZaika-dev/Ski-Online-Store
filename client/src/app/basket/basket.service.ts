import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isBs3 } from 'ngx-bootstrap/utils';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../models/basket';
import { DeliveryMethod } from '../models/deliveryMethod';
import { IProduct } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();
  private basketTotalsSource = new BehaviorSubject<IBasketTotals>(null);
  basketTotal$ = this.basketTotalsSource.asObservable();
  shipping = 0

  constructor(private http: HttpClient) { }

  setShippingPrice(deliveryMethod: DeliveryMethod) {
    this.shipping = deliveryMethod.price;
    this.calculateTotals();
  }

  getBasket(id: string) {
    return this.http.get(this.baseUrl + 'basket?id=' + id)
      .pipe(
        map((basket: IBasket) => {
          this.basketSource.next(basket);
          this.calculateTotals();
        })
      );
  }

  setBasket(basket: IBasket) {
    return this.http.post(this.baseUrl + 'basket', basket).subscribe((response: IBasket) => {
      this.basketSource.next(response);
      this.calculateTotals();
    }, error => {
      console.log(error);
    });
  }

  getCurrentBasket() {
    return this.basketSource.value;
  }

  addItemToBasket(item: IProduct, quantity = 1) {
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(item, quantity);
    const basket = this.getCurrentBasket() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  incrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasket();
    const foundIndex = basket.items.findIndex(i => i.id === item.id);
    basket.items[foundIndex].quantity++;
    this.setBasket(basket);
  }

  decrementItemQuantity(id: number) {
    const basket = this.getCurrentBasket();
    const foundIndex = basket.items.findIndex(i => i.id === id);
    if (basket.items[foundIndex].quantity > 1) {
      basket.items[foundIndex].quantity--;
      this.setBasket(basket);
    } else {
      this.removeItemFromBasket(id);
    }
    
  }

  removeItemFromBasket(id: number) {
    const basket = this.getCurrentBasket();
    if (basket.items.some(i => i.id === id)) {
      basket.items = basket.items.filter(i => i.id !== id);
      if (basket.items.length > 0) {
        this.setBasket(basket);
      } else {
        this.deleteBasket(basket.id);
      }
    }
  }

  deleteBasket(id: string) {
    return this.http.delete(this.baseUrl + 'basket?id=' + id).subscribe(() => {
      this.deleteLocalBasket();
    }, error => {
      console.log(error);
    })
  }

  deleteLocalBasket() {
    this.basketSource.next(null);
    this.basketTotalsSource.next(null);
    localStorage.removeItem('basket_id');
  }

  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    const index = items.findIndex(i => i.id === itemToAdd.id);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } else {
      items[index].quantity += quantity;
    }
    return items;
  }

  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem("basket_id", basket.id);
    return basket;
  }

  private mapProductItemToBasketItem(item: IProduct, quanity: any): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity: quanity,
      brand: item.productBrand,
      type: item.productType

    };
  }

  private calculateTotals() {
    const basket = this.getCurrentBasket();
    const subtotal = basket.items.reduce((a, b) => b.price * b.quantity + a, 0);
    const total = this.shipping + subtotal;
    this.basketTotalsSource.next({shipping: this.shipping, subtotal, total});
  }
}
