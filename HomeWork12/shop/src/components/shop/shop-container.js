import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Shop from './shop-view'
import { LoadProducts } from '../../redux/shop/shop-action'
import { RemoveProduct, AddProduct, ChangeProduct } from '../../redux/cart/cart-action';

export class ShopContainer extends Component {
  static propTypes = {
    products: PropTypes.array.isRequired,
    loadProducts: PropTypes.func.isRequired,
    removeProduct: PropTypes.func.isRequired,
    addProduct: PropTypes.func.isRequired,
    changeProduct: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.loadProducts()
  }


  render() {
    const { products, addProduct, removeProduct, changeProduct, cartProducts } = this.props
    return (
      <Shop products={products}
      add={addProduct}
      remove={removeProduct}
      cartProducts={cartProducts}
      change={changeProduct} />
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.shop.products,
  cartProducts: state.cart.cartProducts
})

const mapDispatchToProps = {
  loadProducts: LoadProducts,
  removeProduct: RemoveProduct,
  addProduct: AddProduct,
  changeProduct: ChangeProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopContainer)
