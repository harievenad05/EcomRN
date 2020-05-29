import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);

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
        onAddCartHandler={() => {}}
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
