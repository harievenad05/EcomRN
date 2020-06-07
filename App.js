import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {StyleSheet, StatusBar, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

import productsReducer from './src/store/reducers/products';
import cartReducer from './src/store/reducers/cart';
import orderReducer from './src/store/reducers/orders';
import ShopDrawerNav from './src/navigation/ShopNavigator';
import Colors from './src/constants/Colors';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: orderReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = (props) => {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={Colors.mainColor}
        barStyle={Platform.OS === 'android' ? 'light-content' : 'default'}
      />
      <Provider store={store}>
        <ShopDrawerNav />
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
