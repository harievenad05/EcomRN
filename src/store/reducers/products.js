import PRODUCTS from '../../data/dummy-data';
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
} from '../actions/products';
import Product from '../../models/product';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === 'u1'),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.id,
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.id,
        ),
      };
    case CREATE_PRODUCT:
      const newProduct = new Product(
        new Date().toString(),
        'u1',
        action.productData.title,
        action.productData.imageUrl,
        action.productData.price,
        action.productData.description,
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.availableProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.id,
      );
      const updatedProduct = new Product(
        action.id,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        state.userProducts[productIndex].price,
        action.productData.description,
      );
      const updatedUserProduct = [...state.userProducts];
      updatedUserProduct[productIndex] = updatedProduct;

      const availableProductIndex = state.availableProducts.findIndex(
        (prod) => prod.id === action.id,
      );

      const updateAvailableProducts = [...state.availableProducts];
      updateAvailableProducts[availableProductIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updateAvailableProducts,
        userProducts: updatedUserProduct,
      };
    default:
      return state;
  }
};
