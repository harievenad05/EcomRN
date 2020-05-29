import {ADD_TO_CART, REMOVE_FROM_CART} from '../actions/cart';
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
      const productImage = addedProduct.imageUrl;
      let cartItem;
      if (state.items[addedProduct.id]) {
        //already have that item
        cartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          productImage,
          state.items[addedProduct.id].sum + productPrice,
        );
      } else {
        cartItem = new CartItem(
          1,
          productPrice,
          productTitle,
          productImage,
          productPrice,
        );
      }

      return {
        ...state, //redundant
        items: {...state.items, [addedProduct.id]: cartItem},
        totalAmount: state.totalAmount + productPrice,
        count: state.count + 1,
      };
    case REMOVE_FROM_CART:
      let updatedCartItem;
      const selectedCartItem = state.items[action.id];
      const currenQty = selectedCartItem.quantity;
      if (currenQty > 1) {
        updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.imageUrl,
          selectedCartItem.sum - selectedCartItem.productPrice,
        );
        updatedCartItem = {...state.items, [action.id]: updatedCartItem};
      } else {
        updatedCartItem = {...state.items};
        delete updatedCartItem[action.id];
      }
      return {
        ...state,
        items: updatedCartItem,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
        count: state.count - 1,
      };
    default:
      return state;
  }
};
