import * as types from './cart-action-types'

export const RemoveProduct = (id) => dispatch => {
  dispatch({
    type: types.REMOVE,
    payload: {
      productId: id
    }
  });
}
export const AddProduct = (product) => dispatch => {
  dispatch({
    type: types.ADD,
    payload: {
      product: product,
      count: 1
    }
  });
}
export const ChangeProduct = (id, value) => dispatch => {
  dispatch({
    type: types.CHANGE,
    payload: {
      productId: id,
      value: value
    }
  });
}
