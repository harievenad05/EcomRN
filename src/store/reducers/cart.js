import {ADD_TO_CART} from '../actions/cart';
import CartItem from '../../models/cart-item';

const initialState = {
  items: {},
  totalAmount: 0,
  count: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;
      let cartItem;
      if (state.items[addedProduct.id]) {
        //already have that item
        cartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addedProduct.id].sum + productPrice,
        );
      } else {
        cartItem = new CartItem(1, productPrice, productTitle, productPrice);
      }
      return {
        ...state, //redundant
        items: {...state.items, [addedProduct.id]: cartItem},
        totalAmount: state.totalAmount + productPrice,
        count: state.count + 1,
      };

    default:
      return state;
  }
};
