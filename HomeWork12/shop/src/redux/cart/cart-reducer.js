import * as types from './cart-action-types'

const initialState = {
  cartProducts: [],
  cartCountProducts: 0,
  cartTotalPrice: 0
}


function updatePrices(products){
  return {
    cartCountProducts: products.reduce((curr, val) => curr + val.count, 0),
    cartTotalPrice: products.reduce((curr, val) => curr + val.count * val.product.price, 0)
  }
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD:
      const products = [...state.cartProducts, action.payload];
      return {
        ...state,
        cartProducts: products,
        ...updatePrices(products)
      }
    case types.REMOVE:
      const filteredProducts = state.cartProducts.filter(pr => pr.product.id  !== action.payload.productId);
      return {
        ...state,
        cartProducts: filteredProducts ,
        ...updatePrices(filteredProducts)
      }
    case types.CHANGE:
      const newProducts = state.cartProducts.map(pr => {
        if (pr.product.id === action.payload.productId){
          return {
            ...pr,
            count: pr.count + action.payload.value
          }
        }
        return {...pr};
      });
      return {
        ...state,
        cartProducts: newProducts,
        ...updatePrices(newProducts)
      }
    default:
      return state;
  }
}