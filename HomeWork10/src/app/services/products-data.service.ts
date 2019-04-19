import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataService {

  // tslint:disable-next-line: variable-name
  private _products: Observable<Product[]>;

  constructor(private http: HttpClient) {
    this._products = this.http.get<Product[]>('./assets/data.json');
  }

  getProducts(): Observable<Product[]> {
    return this._products;
  }
}
