import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import Colors from '../../constants/Colors';

const ProductItem = (props) => {
  let TouchableComp = TouchableOpacity;
  Platform.OS === 'android' && Platform.Version >= 21
    ? (TouchableComp = TouchableNativeFeedback)
    : null;
  return (
    <View style={{flex: 1, width: '100%'}}>
      <View style={styles.container}>
        <TouchableComp
          style={styles.imageContainerStyle}
          onPress={props.viewDetailsHandler}
          useForeground>
          <Image style={styles.imageStyle} source={{uri: props.imageURL}} />
        </TouchableComp>
        <View style={styles.detailContainer}>
          <Text style={styles.titleStyle}>{props.title}</Text>
          <Text style={styles.priceStyle}>${props.price.toFixed(2)}</Text>
        </View>
        <View style={styles.actionContainerStyle}>
        <View style={[{ width: "35%", margin: 10 }]}>
        <Button
          color={Colors.primaryColor}
          title={props.buttonOneTitle}
          onPress={props.onLeftBtnClickHandler}
        />
        </View>
        <View style={[{ width: "35%", margin: 10 }]}>
        <Button
          color={Colors.primaryColor}
          title={props.buttonTwoTitle}
          onPress={props.onRightBtnClickHandler}
        />
        </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 6,
    backgroundColor: 'white',
    height: 320,
    margin: 15,
    overflow: Platform.OS === 'android' ? 'hidden' : null
  },
  imageContainerStyle: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    overflow: 'hidden',
  },
  imageStyle: {
    width: '100%',
    height: Platform.OS === 'android' ? '60%' : '100%',
    borderBottomLeftRadius:  Platform.OS === 'android' ? 6 : null,
    borderBottomRightRadius: Platform.OS === 'android' ? 6 : null,
  },
  detailContainer: {
    alignItems: 'center',
    height: '23%',
    padding: 10,
  },
  titleStyle: {
    fontSize: 18,
    marginVertical: 2,
  },
  priceStyle: {
    fontSize: 14,
    color: '#888',
    marginVertical: 3,
  },
  actionContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    height: '18%',
  },
});

export default ProductItem;
