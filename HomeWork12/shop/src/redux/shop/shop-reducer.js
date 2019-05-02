import * as types from './shop-action-types'

const initialState = {
  products: []
}

export default function shopReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD:
      return {
        ...state,
        products: action.payload.products
      }

    default:
      return state

  }
}