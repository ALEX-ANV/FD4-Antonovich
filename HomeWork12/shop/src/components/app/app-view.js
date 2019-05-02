import React from 'react'
import './app.scss'

import Router, { CART_URL, SHOP_URL } from '../../router';

export default function App({ totalCount, history }) {


  const toCart = () => {
    history.push(CART_URL);
  }

  const toGeneral = () => {
    history.push(SHOP_URL);
  }

  return (
    <div className="App">
      <div className="panel">
        <nav>
          <button type="button" onClick={toGeneral}>Главная</button>
          <button type="button" onClick={toCart}>Корзина</button>
        </nav>

        {
          totalCount ?
          <div className="cartTotalCount">
            <span>Количество: {totalCount}</span>
          </div>
        :
         null
        }
      </div>
      <Router />
    </div>
  )
}
