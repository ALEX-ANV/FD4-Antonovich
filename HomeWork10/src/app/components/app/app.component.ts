import { Component, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {

  private subscriber: Subscription;

  constructor(private cartService: CartService,
    // tslint:disable-next-line: align
    private router: Router) {
  }

  get count(): number {
    return this.cartService.length;
  }

  ngOnInit(): void {
    this.subscriber = this.cartService.getProducts().subscribe(t => {
      if (this.count === 0) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }
}
