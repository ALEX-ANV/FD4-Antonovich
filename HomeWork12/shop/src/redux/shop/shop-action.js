import * as types from './shop-action-types'

import axios from 'axios'

function LoadProductsAction(res) {
  return {
    type: types.LOAD,
    payload: {
      products: res
    }
  }
}

export const LoadProducts = () => dispatch =>
  axios.get('./products.json').then(res => dispatch(LoadProductsAction(res.data)))