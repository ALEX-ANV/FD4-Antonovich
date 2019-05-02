import React from 'react'

import './shop.scss'

import Product from '../product'

export default function Shop({ products, add, remove, change, cartProducts }) {

  return (
    <div className="shop-container">
      {
        products.map(product => {
        const cartProduct = cartProducts.find(t => t.product.id === product.id);
        return <Product
          product={product}
          add={add}
          remove={remove}
          change={change}
          count={cartProduct ? cartProduct.count : 0}
          key={product.id} />

        })
      }
    </div>
  )
}
