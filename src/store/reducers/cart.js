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
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;
      const productImage = addedProduct.imageUrl;
      let updatedOrNewCartItem;
      if (state.items[addedProduct.id]) {
        //already have that item
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          productImage,
          state.items[addedProduct.id].sum + prodPrice,
        );
      } else {
        updatedOrNewCartItem = new CartItem(
          1,
          prodPrice,
          prodTitle,
          productImage,
          prodPrice,
        );
      }

      return {
        ...state, //redundant
        items: {...state.items, [addedProduct.id]: updatedOrNewCartItem},
        totalAmount: state.totalAmount + prodPrice,
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
          selectedCartItem.sum - selectedCartItem,
        );
        updatedCartItem = {...state.items, [action.id]: updatedCartItem};
      } else {
        updatedCartItem = {...state.items};
        delete updatedCartItem[action.id];
      }
      let finalSum = state.totalAmount - selectedCartItem.productPrice;
      let updatedSum = finalSum < 0 ? (finalSum *= -1) : finalSum;
      return {
        ...state,
        items: updatedCartItem,
        totalAmount: updatedSum,
        count: state.count - 1,
      };
    default:
      return state;
  }
};
