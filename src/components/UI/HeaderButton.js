import React from 'react';
import {IconButton} from 'react-native-paper';
import Colors from '../../constants/Colors';
import {Platform, View, Text, TouchableOpacity} from 'react-native';

const HeaderRightBtn = (props) => {
  return (
    <TouchableOpacity
      style={{flexDirection: 'row', marginRight: 10}}
      onPress={props.menuBtnClickAction}>
      <View style={{position: 'relative'}}>
        <IconButton
          icon={props.iconName}
          color={Platform.OS === 'android' ? 'white' : Colors.primaryColor}
          size={25}
          onPress={props.menuBtnClickAction}
        />
      </View>
      {props.cartStatus ? (
        <View
          style={{
            width: 20,
            height: 20,
            marginLeft: -26,
            borderRadius: 10,
            backgroundColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: Platform.OS === 'android'? Colors.primaryColor :'#fff', fontWeight: 'bold', fontSize: 12}}>
            {props.count}
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default HeaderRightBtn;
