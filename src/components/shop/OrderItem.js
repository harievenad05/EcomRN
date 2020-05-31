//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const OrderItem = (props) => {
  return (
    <View styl={styles.container}>
      <View styl={styles.summaryContainer}>
        <View>
          <Text styl={styles.totalAmtStyle}>${props.amount.toFixed(2)}</Text>
        </View>
        <View>
          <Text styl={styles.dateStyle}>{props.orderDate}</Text>
        </View>
      </View>
      <Button title="Show Details" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 6,
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  totalAmtStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateStyle: {
    fontSize: 16,
    color: '#888',
  },
});

export default OrderItem;
