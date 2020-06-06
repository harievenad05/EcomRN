import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as productsAction from '../../store/actions/products';

const UserProduct = (props) => {
  const dispatch = useDispatch();
  const renderedItem = ({item}) => {
    return (
      <ProductItem
        imageURL={item.imageUrl}
        title={item.title}
        price={item.price}
        buttonOneTitle="Edit"
        buttonTwoTitle="Delete"
        onLeftBtnClickHandler={() => navigateToEdit(item.id)}
        onRightBtnClickHandler={() => createTwoButtonAlert(item.id)}
      />
    );
  };

  const navigateToEdit = (id) => {
    props.navigation.navigate('EditProductScreen', {id: id})
  }

  const createTwoButtonAlert = (id) =>
    Alert.alert(
      "Alert",
      "Are you sure want to delete?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => dispatch(productsAction.deleteProduct(id)) }
      ],
      { cancelable: false }
    );



  const userProducts = useSelector((state) => state.products.userProducts);
  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={renderedItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

export default UserProduct;
