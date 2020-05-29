import React from 'react';
import {IconButton} from 'react-native-paper';
import Colors from '../../constants/Colors';
import {Platform, View, Text} from 'react-native';

const HeaderRightBtn = (props) => {
  return (
    <View style={{flexDirection: 'row', marginRight: 10}}>
      <View>
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
            backgroundColor: Colors.primaryColor,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 12}}>
            {props.count}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default HeaderRightBtn;
