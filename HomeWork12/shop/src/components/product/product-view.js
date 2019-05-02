import React from 'react'

import './product.scss'

export default function Product({ product, count, remove, add, change, isCart = false }) {
  const { id, title, price, image, description } = product

  return (
    <div className="product-container" id={id}>
      <img src={image} alt={title} />
      <div className="details">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="right-block">
        {isCart && <button className="remove-button" onClick={remove.bind(this, id)}></button>}
        <div className="price-block">
          <span>Цена: {price} р.</span>
          <div className="price-counter">
            {

              count ?
                <button type="button" className="add" onClick={change.bind(this, id, 1)}></button>
                :
                <button type="button" className="add" onClick={add.bind(this, product)}></button>
            }
            <span>{count}</span>
            {
            count > 1 ?
              <button type="button" className="remove" onClick={change.bind(this, id, -1)}></button>
            :
            <button type="button" className="remove" onClick={remove.bind(this, id)}></button>
            }
          </div>
          {isCart && <span>
              Всего: {price * count } р.
        </span>}
        </div >
      </div >
    </div >
  )
}
