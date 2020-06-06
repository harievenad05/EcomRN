//import liraries
import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
} from 'react-native';

// create a component
const EditProductScreen = ({route, navigation}) => {
  const {id} = route.params;
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{...styles.inputContainer, marginTop: 30}}>
          <Text style={styles.inputTitleStyle}>Title:</Text>
          <TextInput style={styles.txtInputStyle} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitleStyle}>Image Url:</Text>
          <TextInput style={styles.txtInputStyle} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitleStyle}>Price:</Text>
          <TextInput style={styles.txtInputStyle} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitleStyle}>Description:</Text>
          <TextInput style={styles.txtInputStyle} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: Dimensions.get('window').height,
  },
  inputContainer: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputTitleStyle: {
    fontSize: 18,
  },
  textInputViewContainer: {
    height: 40,
  },
  txtInputStyle: {
    height: 40,
    width: '60%',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});

export default EditProductScreen;
