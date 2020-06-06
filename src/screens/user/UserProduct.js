import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';

const UserProduct = (props) => {
  const renderedItem = ({item}) => {
    return (
      <ProductItem
        imageURL={item.imageUrl}
        title={item.title}
        price={item.price}
        buttonOneTitle="Edit"
        buttonTwoTitle="Delete"
        viewDetailsHandler={() => {}}
        onAddCartHandler={() => {}}
      />
    );
  };

  const userProducts = useSelector((state) => state.products.userProducts);
  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={renderedItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

export default UserProduct;
