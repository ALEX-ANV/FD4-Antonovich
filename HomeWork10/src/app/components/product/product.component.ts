import { Product } from './../../models/product';
import { Component, OnChanges, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  private _count: number;

  @Input() data: Product;
  @Input() countProducts?: number;

  constructor(private cartService: CartService) {
    this.count = 0;
  }

  ngOnInit() {
    if (this.countProducts) {
      this.count = this.countProducts;
    }
  }

  get count() {
    return this._count;
  }

  set count(value: number) {
    if (value >= 0) {
      this._count = value;
    }
  }

  onBuyClick() {
    this.count++;
    this.cartService.addProduct(this.data);
  }

  onSellClick() {
    this.count--;
    this.cartService.removeProduct(this.data);
  }

  onRemoveProduct() {
    this.cartService.removeProduct(this.data, true);
  }
}
