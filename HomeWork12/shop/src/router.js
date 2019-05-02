import React from 'react'

import { Route, Redirect, Switch } from 'react-router-dom'

import Shop from './components/shop'
import Cart from './components/cart'

export const SHOP_URL = "/"
export const CART_URL = "/cart"

export default function router() {
  return (
    <Switch>
      <Route
        path={SHOP_URL}
        exact
        component={Shop} />
      <Route
        path={CART_URL}
        component={Cart}
      />
      <Redirect
        path="**"
        to={SHOP_URL}
      />
    </Switch>
  )
}
