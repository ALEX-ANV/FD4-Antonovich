import React from 'react'

import './cart.scss'

import Product from '../product'

export default function Cart({ cartProducts, cartTotalPrice, removeProduct, changeProduct, addProduct }) {
  return (
    <div className="cart-container">
      <div className="cart-products-container">
        {
          cartProducts.map(pr => <Product count={pr.count}
             product={pr.product}
             remove={removeProduct}
             change={changeProduct}
             add={addProduct}
             isCart={true}
             key={pr.product.id} />)
        }
      </div>
      {
        cartProducts.length > 0 && <div className="cart-total">
        <span>Всего: {cartTotalPrice} р.</span>
      </div>
      }
    </div>
  )
}
