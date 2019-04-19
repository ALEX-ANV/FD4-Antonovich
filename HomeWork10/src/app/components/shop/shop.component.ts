import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsDataService } from 'src/app/services/products-data.service';
import { Subscription, Observable } from 'rxjs';

import { Product } from './../../models/product';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {

  constructor(private productsDataService: ProductsDataService) { }

  get products() {
    return this.productsDataService.getProducts();
  }

  trackByFn(index: number, item: Product) {
    return item.id;
  }
}
