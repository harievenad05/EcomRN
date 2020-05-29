//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CartItems = (props) => {
  return (
    <View style={styles.container}>
      <Image style={styles.imgStyle} source={{uri: props.imageURL}} />
      <View style={styles.itemDataContainer}>
        <Text style={styles.qtyTxt}>{props.quantity}</Text>
        <Text style={styles.attributeTxt} maxLength={5}>
          {props.title}
        </Text>
      </View>

      <View style={styles.itemDataContainer}>
        <Text style={styles.attributeTxt}>${props.amount.toFixed(2)}</Text>
        <TouchableOpacity
          onPress={props.removeItemAction}
          style={styles.trashStyle}>
          <Ionicons
            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
            size={25}
            color="red"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  trashStyle: {
    marginLeft: 20,
    width: 23,
    height: 23,
  },
  itemDataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyTxt: {
    color: '#888',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  attributeTxt: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  imgStyle: {
    width: 100,
    height: 80,
  },
});

//make this component available to the app
export default CartItems;
