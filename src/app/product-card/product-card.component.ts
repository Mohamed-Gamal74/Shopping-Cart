import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product';
import { CounterService } from '../service/counter.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product = {
    createdAt: '',
    name: '',
    image: '',
    rate: 0,
    count: 0,
    description: '',
    price: '',
    reviews: [],
    id: '',
  };

  constructor(private cartService: CounterService, private router: Router) {}

  ngOnInit(): void {}

  handleAddToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  handleShowDetail() {
    this.router.navigate(['/product-details' , this.product.id])
  }
}
