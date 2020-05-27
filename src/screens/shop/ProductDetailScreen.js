import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ProductDetailScreen = () => {
  return (
    <View style={styles.container}>
      <Text>ProductDetailScreen</Text>
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

export default ProductDetailScreen;
