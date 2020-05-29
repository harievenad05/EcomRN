import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import Colors from '../../constants/Colors';
import CartItems from '../../components/shop/CartItems';
import Helpers from '../../common/helpers/Helpers';

const CartScreen = (props) => {
  const cartAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const tranformedItems = [];
    for (key in state.cart.items) {
      tranformedItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        productImage: state.cart.items[key].imageUrl,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return tranformedItems;
  });
  const height = Dimensions.get('window').height;

  const rederedItemData = ({item}) => {
    let customizedTitle = Helpers.maxTextLength(item.productTitle, 9);
    return (
      <CartItems
        quantity={item.quantity}
        title={customizedTitle}
        amount={item.sum}
        imageURL={item.productImage}
        removeItemAction={() => console.log(customizedTitle)}
        cartItemNavAction={() =>
          props.navigation.navigate('ProductsDetail', {
            productId: item.productId,
            title: item.productTitle,
          })
        }
      />
    );
  };

  return (
    <View style={{flexDirection: 'column'}}>
      <View style={{height: height - 190}}>
        <FlatList
          data={cartItems}
          keyExtractor={(itm) => itm.productId}
          renderItem={rederedItemData}
        />
      </View>
      <View style={{justifyContent: 'flex-end'}}>
        <View style={{...styles.summaryStyle, ...{height: 70}}}>
          <View>
            <Text style={styles.amountTxt}>${cartAmount.toFixed(2)}</Text>
          </View>
          {cartItems.length !== 0 ? (
            <TouchableOpacity style={styles.orderNowBtnStyle}>
              <Text style={styles.orderNowBtnTxt}>Order Now</Text>
            </TouchableOpacity>
          ) : (
            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'red'}}>
              No items
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
    marginHorizontal: 5,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 6,
    backgroundColor: 'white',
  },
  summaryTxt: {},
  amountTxt: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderNowBtnStyle: {
    marginVertical: 10,
    marginRight: 10,
    backgroundColor: 'yellow',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: Colors.primaryColor,
  },
  orderNowBtnTxt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 10,
  },
});

export default CartScreen;
