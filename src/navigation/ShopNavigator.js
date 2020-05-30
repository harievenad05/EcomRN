import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import Colors from '../constants/Colors';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import HeaderRightBtn from '../components/UI/HeaderButton';
import {useSelector} from 'react-redux';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrdersScreen';
import MenuBtn from '../components/UI/MenuBtn';

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

  const cartBtnBadge = (navigation) => {
    let cartStatus;
    cartQty > 0 ? (cartStatus = true) : (cartStatus = false);
    return (
      <HeaderRightBtn
        iconName={'cart'}
        cartStatus={cartStatus}
        count={cartQty}
        menuBtnClickAction={() => navigation.navigate('CartScreen')}
      />
    );
  };

  return (
    <Stack.Navigator screenOptions={defaultStackNavOptions}>
      <Stack.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={({route, navigation}) => ({
          title: 'Products',
          headerBackTitleVisible: false,
          headerLeft: () => (
            <MenuBtn
              menuClick={() => {
                navigation.toggleDrawer();
              }}
            />
          ),
          headerRight: () => cartBtnBadge(navigation),
        })}
      />
      <Stack.Screen
        name="ProductsDetail"
        component={ProductDetailScreen}
        options={({route, navigation}) => ({
          title: route.params.title,
          headerBackTitleVisible: false,
          headerRight: () => cartBtnBadge(navigation),
        })}
      />
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={({route, navigation}) => ({
          title: 'Cart',
          headerBackTitleVisible: false,
        })}
      />
    </Stack.Navigator>
  );
};

const ordersStackNav = (props) => {
  return (
    <Stack.Navigator screenOptions={defaultStackNavOptions}>
      <Stack.Screen
        name="OrdersScreen"
        component={OrderScreen}
        options={({route, navigation}) => ({
          title: 'Orders',
          headerLeft: () => (
            <MenuBtn
              menuClick={() => {
                navigation.toggleDrawer();
              }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const defaultDrawerNavOptions = {
  activeTintColor: Colors.primaryColor,
  // itemStyle: {marginTop: 10},
  labelStyle: {fontSize: 14, fontWeight: 'bold'},
};

const ShopDrawerNav = (props) => {
  return (
    <Drawer.Navigator drawerContentOptions={defaultDrawerNavOptions}>
      <Drawer.Screen
        name="ProductsStack"
        component={ProductsNavigator}
        options={({route}) => ({
          title: 'Products',
        })}
      />
      <Drawer.Screen
        name="OrderStack"
        component={ordersStackNav}
        options={({route}) => ({
          title: 'Orders',
        })}
      />
    </Drawer.Navigator>
  );
};

export default ShopDrawerNav;
