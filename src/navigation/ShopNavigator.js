import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import Colors from '../constants/Colors';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import HeaderRightBtn from '../components/UI/HeaderButton';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const defaultStackNavOptions = {
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'null',
  },
};

const ProductsNavigator = (props) => {
  const cartItems = useSelector((state) => state.cart);
  let cartQty = cartItems.count;

  const cartBtnBadge = () => {
    let cartStatus;
    cartQty > 0 ? (cartStatus = true) : (cartStatus = false);
    return (
      <HeaderRightBtn
        iconName={'cart'}
        cartStatus={cartStatus}
        count={cartQty}
        menuBtnClickAction={() => console.log('Cart is working')}
      />
    );
  };

  return (
    <Stack.Navigator screenOptions={defaultStackNavOptions}>
      <Stack.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={({route}) => ({
          headerBackTitleVisible: false,
          headerRight: cartBtnBadge,
        })}
      />
      <Stack.Screen
        name="ProductsDetail"
        component={ProductDetailScreen}
        options={({route}) => ({
          title: route.params.title,
          headerBackTitleVisible: false,
          headerRight: cartBtnBadge,
        })}
      />
    </Stack.Navigator>
  );
};

export default ProductsNavigator;
