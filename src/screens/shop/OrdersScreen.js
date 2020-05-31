import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import OrderItem from '../../components/shop/OrderItem';

const OrderScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);

  const renderedItems = ({item}) => {
    return (
      <OrderItem amount={item.totalAmount} orderDate={item.readableDate} />
    );
  };
  return (
    <View>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderedItems}
      />
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

export default OrderScreen;
