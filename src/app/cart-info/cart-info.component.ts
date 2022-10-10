import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CounterService } from '../service/counter.service';

@Component({
  selector: 'app-cart-info',
  templateUrl: './cart-info.component.html',
  styleUrls: ['./cart-info.component.css'],
})
export class CartInfoComponent implements OnInit {
  productDetails: any = [];
  totalPrice: number = 0;

  constructor(private cartService: CounterService, private router: Router) {}

  // remove selected item from the cart
  removeItem(product: any) {
    this.cartService.removeFromCart(product);
    // make total price with 0 and call total price again
    this.totalPrice = 0;
    this.getTotalPrice();
  }

  // remove the cart
  removeAllItems() {
    this.cartService.removeCart();
  }

  // routing to home page when click
  routeToHome() {
    this.router.navigate(['/']);
  }

  // get the products that was added to the cart
  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res) => {
      this.productDetails = res;
    });
    // call total price at first
    this.getTotalPrice();
  }

  // increase the quantity of item
  increaseCounter(index: number) {
    this.productDetails[index].quantity++;
    // this.totalPrice = 0;
    this.getTotalPrice();
  }

  // decrease the quantity of item and check if the quantity is already one
  decreaseCounter(index: number) {
    if (this.productDetails[index].quantity - 1 < 1) {
      this.productDetails[index].quantity = 1;
    } else {
      this.productDetails[index].quantity--;
      this.totalPrice = 0;
      this.getTotalPrice();
    }
  }

  // function to get the total price of items in the cart
  getTotalPrice() {
    for (let i = 0; i < this.productDetails.length; i++) {
      let price =
        this.productDetails[i].price * this.productDetails[i].quantity;
      this.totalPrice += price;
    }
  }
}
