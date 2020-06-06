import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

const AddButton = (props) => {
  return (
    <View >
    <IconButton
      icon={props.iconName}
      color={Platform.OS === 'android' ? 'white' : Colors.primaryColor}
      size={25}
      onPress={props.menuBtnClickAction}
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

export default AddButton;
