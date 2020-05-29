import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../../constants/Colors';
import * as cartAction from '../../store/actions/cart';

const ProductDetailScreen = ({route, navigation}) => {
  const {productId} = route.params;

  const dispatch = useDispatch();

  const availableProducts = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id == productId),
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.imgStyle}
            source={{uri: availableProducts.imageUrl}}
          />
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.cartActionBtnStyle}
            color={Colors.primaryColor}
            onPress={() => {
              dispatch(cartAction.addToCart(availableProducts));
            }}>
            <Text style={styles.cartActionsText}>Add to cart</Text>
          </TouchableOpacity>
          <View style={{width: 2}}></View>
          <TouchableOpacity
            style={styles.cartActionBtnStyle}
            color={Colors.primaryColor}
            onPress={() => {}}>
            <Text style={styles.cartActionsText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.priceTextContainer}>
          <Text style={styles.priceStyle}>
            ${availableProducts.price.toFixed(2)}
          </Text>
        </View>
        <View style={styles.desContainer}>
          <Text style={styles.descriptionStyle}>
            {availableProducts.description}
          </Text>
        </View>
        <Text></Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  btnContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  priceTextContainer: {
    width: '100%',
    height: 35,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    marginVertical: 5,
  },
  cartActionsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primaryColor,
  },
  cartActionBtnStyle: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  imgContainer: {
    width: '98%',
    borderRadius: 6,
    overflow: 'hidden',
  },
  imgStyle: {
    width: '100%',
    height: 300,
  },
  priceStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888',
    textAlign: 'center',
    // marginTop: 10,
  },
  desContainer: {
    width: '95%',
  },
  descriptionStyle: {
    fontSize: 15,
  },
});

export default ProductDetailScreen;
