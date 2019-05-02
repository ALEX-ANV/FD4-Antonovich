import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import App from './app-view'

export class AppContainer extends Component {
  static propTypes = {
    cartCountProducts: PropTypes.number.isRequired,
  }

  render() {
    return (
      <App totalCount={this.props.cartCountProducts} history={this.props.history} />
    )
  }
}

const mapStateToProps = (state) => ({
  cartCountProducts: state.cart.cartCountProducts,
})

export default connect(mapStateToProps, null)(withRouter(AppContainer))
