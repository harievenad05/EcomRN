import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);

  const renderItems = ({item}) => {
    return <Text>{item.title}</Text>;
  };
  return (
    <View style={styles.container}>
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
