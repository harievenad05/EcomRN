import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import Colors from '../constants/Colors';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import HeaderRightBtn from '../components/UI/HeaderButton';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrdersScreen';
import MenuBtn from '../components/UI/MenuBtn';
import UserProduct from '../screens/user/UserProduct';
import EditProductScreen from '../screens/user/EditProductScreen';
import AddButton from '../components/UI/AddButton';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const defaultStackNavOptions = {
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'null',
  },

  headerTitleAlign: 'center',
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

const AdminProductStackNav = (props) => {

  const addBtnIcon = (navigation) => {
    console.log(navigation)
    return (
      <AddButton
        iconName={'plus'}
        menuBtnClickAction={() => navigation.navigate('EditProductScreen')}
      />
    );
  };

  return (
    <Stack.Navigator screenOptions={defaultStackNavOptions}>
      <Stack.Screen
        name="UserProductScreen"
        component={UserProduct}
        options={({route, navigation}) => ({
          title: 'Product',
          headerLeft: () => (
            <MenuBtn
              menuClick={() => {
                navigation.toggleDrawer();
              }}
            />
          ),
          headerRight:() => addBtnIcon(navigation),
        })}
      />
      <Stack.Screen
      name="EditProductScreen"
      component={EditProductScreen}
      options={({route, navigation}) => ({
        title: 'Edit',

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
        options={{
          title: 'Products',
          drawerIcon: ({focused, size}) => (
            <Icon
              name="shopping-basket"
              size={23}
              color={focused ? Colors.primaryColor : '#ccc'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="OrderStack"
        component={ordersStackNav}
        options={{
          title: 'Orders',
          drawerIcon: ({focused, size}) => (
            <Icon
              name="shopping-bag"
              size={23}
              color={focused ? Colors.primaryColor : '#ccc'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="AdminStack"
        component={AdminProductStackNav}
        options={{
          title: 'Admin',
          drawerIcon: ({focused, size}) => (
            <Icon
              name="user"
              size={23}
              color={focused ? Colors.primaryColor : '#ccc'}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default ShopDrawerNav;
