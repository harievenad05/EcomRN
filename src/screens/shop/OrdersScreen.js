import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const OrderScreen = () => {
  return (
    <View style={styles.container}>
      <Text>OrderScreen</Text>
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
