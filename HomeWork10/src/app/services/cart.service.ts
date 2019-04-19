import { Product } from './../models/product';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private products: Map<Product, number>;
  // tslint:disable-next-line: variable-name
  private _products: BehaviorSubject<Map<Product, number>>;

  constructor() {
    this.products = new Map();
    this._products = new BehaviorSubject(this.products);
  }

  get length(): number {
    return Array.from(this.products, ([, value]) => value).reduce((prev, curr) => prev + curr, 0);
  }

  public addProduct(product: Product, count: number = 1): void {
    if (this.products.has(product)) {
      this.addCountProduct(product, count);
      return;
    }
    this.products.set(product, count);
    this._products.next(this.products);
  }

  public getProducts(): Observable<Map<Product, number>> {
    return this._products.asObservable();
  }

  public removeProduct(product: Product, force: boolean = false): void {
    if (force) {
      this.remove(product);
      return;
    }
    if (this.products.size === 0) {
      return;
    }
    if (this.products.get(product) > 1) {
      this.minusCountProduct(product);
      return;
    }
    this.remove(product);
  }


  private changeCountProducts(product: Product, value: number) {
    this.products.set(product, this.products.get(product) + value);
    this._products.next(this.products);
  }

  private addCountProduct(product: Product, count: number = 1) {
    this.changeCountProducts(product, count);
  }

  private minusCountProduct(product: Product) {
    this.changeCountProducts(product, -1);
  }

  private remove(product: Product) {
    this.products.delete(product);
    this._products.next(this.products);
  }
}
