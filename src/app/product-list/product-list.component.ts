import { Component, Input, OnInit } from '@angular/core';
import { RequestService } from '../service/request.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  productList: any = [];

  constructor(private productService: RequestService) {}

  // maing http request to data and adding quantity property to it with inital value 1
  ngOnInit(): void {
    this.productService.getProductsList().subscribe((products) => {
      this.productList = products;
      this.productList.forEach((e: any) => {
        Object.assign(e, { quantity: 1 });
      });
    });
  }
}
