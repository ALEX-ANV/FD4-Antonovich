import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { RemoveProduct, AddProduct, ChangeProduct } from '../../redux/cart/cart-action';
import Cart from './cart-view';



export class CartContainer extends Component {
  static propTypes = {
    cartProducts: PropTypes.array.isRequired,
    cartCountProducts: PropTypes.number.isRequired,
    cartTotalPrice: PropTypes.number.isRequired,
    removeProduct: PropTypes.func.isRequired,
    addProduct: PropTypes.func.isRequired,
    changeProduct: PropTypes.func.isRequired,
  }

  render() {
    return (
      <Cart {...this.props} />
    )
  }
}

const mapStateToProps = (state) => ({
  cartProducts: state.cart.cartProducts,
  cartCountProducts: state.cart.cartCountProducts,
  cartTotalPrice: state.cart.cartTotalPrice
})

const mapDispatchToProps = {
  removeProduct: RemoveProduct,
  addProduct: AddProduct,
  changeProduct: ChangeProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer)
