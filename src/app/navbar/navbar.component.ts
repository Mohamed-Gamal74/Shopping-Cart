import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CounterService } from '../service/counter.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  totalItem: number = 0;
  constructor(private router: Router, private cartService: CounterService) {}

  ngOnInit(): void {
    this.cartService
      .getProducts()
      .subscribe((res) => (this.totalItem = res.length));
  }

  handleCartRoute() {
    this.router.navigate(['cart']);
  }
}
