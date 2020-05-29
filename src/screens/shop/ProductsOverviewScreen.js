import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const renderItems = ({item}) => {
    return (
      <ProductItem
        imageURL={item.imageUrl}
        title={item.title}
        price={item.price}
        viewDetailsHandler={() => {
          props.navigation.navigate('ProductsDetail', {
            productId: item.id,
            title: item.title,
          });
        }}
        onAddCartHandler={() => {
          dispatch(cartActions.addToCart(item));
        }}
      />
    );
  };
  return (
    <View>
      <FlatList data={products} renderItem={renderItems} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductsOverviewScreen;
