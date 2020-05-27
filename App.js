import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {StyleSheet, StatusBar, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import productsReducer from './src/store/reducers/products';
import ProductsNavigator from './src/navigation/ShopNavigator';
import Colors from './src/constants/Colors';

const rootReducer = combineReducers({
  products: productsReducer,
});

const store = createStore(rootReducer);

const App = (props) => {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={Colors.mainColor}
        barStyle={Platform.OS === 'android' ? 'light-content' : 'default'}
      />
      <Provider store={store}>
        <ProductsNavigator />
      </Provider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
