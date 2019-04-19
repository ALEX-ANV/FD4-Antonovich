import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartComponent } from './components/cart/cart.component';
import { ShopComponent } from './components/shop/shop.component';
import { CartGuard } from './guards/cart.guard';

const routes: Routes = [
  {
    component: CartComponent,
    path: 'cart',
    canActivate: [CartGuard]
  },
  {
    component: ShopComponent,
    path: ''
  },
  {
    path: '**', redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
