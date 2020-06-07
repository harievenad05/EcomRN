//import liraries
import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import Colors from '../../constants/Colors';
import CartItems from './CartItems';
import Helpers from '../../common/helpers/Helpers';
import Card from '../UI/Card';

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.orderDate}</Text>
      </View>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          setShowDetails((prevState) => !prevState);
        }}>
        <Text style={styles.buttonTxtStyle}>
          {showDetails ? 'Hide Details' : 'Show Details'}
        </Text>
      </TouchableOpacity>
      {showDetails && (
        <View style={styles.orderDetailsStyle}>
          {props.items.map((cartItem) => (
            <CartItems
              key={cartItem.productId}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={`${Helpers.maxTextLength(cartItem.productTitle, 14)} `}
              items={cartItem}
              imageURL={cartItem.productImage}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 8,
    padding: 10,
    alignItems: 'center',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  totalAmount: {
    paddingTop: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    paddingTop: 8,
    fontSize: 16,
    color: '#888',
  },
  detailItems: {
    width: '100%',
  },
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: 8,
    padding: 10,
  },
  buttonTxtStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  orderDetailsStyle: {
    width: '100%',
  },
});

export default OrderItem;
