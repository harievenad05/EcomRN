import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Button, Image} from 'react-native';
import {useSelector} from 'react-redux';

const ProductDetailScreen = ({route, navigation}) => {
  const {productId} = route.params;

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
        <Button title="Add to Cart" onPress={() => {}} />
        <Text style={styles.priceStyle}>
          ${availableProducts.price.toFixed(2)}
        </Text>
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
    marginTop: 20,
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
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
  desContainer: {
    width: '95%',
  },
  descriptionStyle: {
    fontSize: 14,
  },
});

export default ProductDetailScreen;
