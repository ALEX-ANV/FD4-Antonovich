import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  constructor(private cartService: CartService) { }

  get products() {
    return this.cartService.getProducts();
  }

  trackByFn(index: number, item: { key: Product, value: number }) {
    return item.key.id;
  }
}
