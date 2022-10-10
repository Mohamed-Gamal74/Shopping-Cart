import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../service/request.service';
import { CounterService } from '../service/counter.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  productDetails: any = {};
  constructor(
    private router: ActivatedRoute,
    private productService: RequestService,
    private cartService: CounterService
  ) {}

  // getting the id from href and make http request to that id and adding quantity to it with 1
  ngOnInit(): void {
    const param = this.router.snapshot.params;
    this.productService.getProductDetail(param['id']).subscribe((res) => {
      this.productDetails = res;
      this.productDetails.quantity = 1;
    });
  }

  handleAddToCart(product: any) {
    this.cartService.addToCart(product);
  }
}
