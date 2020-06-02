import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import OrderItem from '../../components/shop/OrderItem';
import moment from 'moment';

const OrderScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);

  const renderedItems = ({item}) => {
    const height = Dimensions.get('window').height;
    const convertedDate = moment(item.date).format('MMMM D YY, h:mm a');
    return (
      <View>
        <OrderItem
          amount={item.totalAmount}
          orderDate={convertedDate}
          items={item.items}
        />
      </View>
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
