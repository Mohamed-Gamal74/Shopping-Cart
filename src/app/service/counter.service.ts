import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);

  constructor() {}

  getProducts() {
    return this.productList.asObservable();
  }

  // set product
  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  // service to the cart and check if the item is already exist on the cart or no
  //if the item exist it will increase the quantity of it
  // if not exist it will push to the cart array
  addToCart(product: any) {
    let result = this.cartItemList.find(
      (item: { id: any }) => item.id === product.id
    );

    if (result) {
      product.quantity++;
    } else {
      this.cartItemList.push(product);
      this.productList.next(this.cartItemList);
    }
  }

  // remove the item from cart
  removeFromCart(product: any) {
    this.cartItemList.map((e: any, i: any) => {
      if (product.id === e.id) {
        this.cartItemList.splice(i, 1);
      }
    });
    this.productList.next(this.cartItemList);
  }

  // remove all cart and reset the cart array
  removeCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}
