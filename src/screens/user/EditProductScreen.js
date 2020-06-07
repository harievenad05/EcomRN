//import liraries
import React, {useEffect, useCallback, useReducer} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../../constants/Colors';
import * as productAction from '../../store/actions/products';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
    };
  }
  return state;
};

const EditProductScreen = ({route, navigation}) => {
  const {id} = route.params;
  const dispatch = useDispatch();

  let editedProducts = null;
  if (id) {
    editedProducts = useSelector((state) =>
      state.products.userProducts.find((prod) => prod.id === id),
    );
  }

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProducts ? editedProducts.title : '',
      imageUrl: editedProducts ? editedProducts.imageUrl : '',
      price: '',
      description: editedProducts ? editedProducts.description : '',
    },
    inputValidities: {
      title: editedProducts ? true : false,
      imageUrl: editedProducts ? true : false,
      price: editedProducts ? true : false,
      description: editedProducts ? true : false,
    },
    formIsValid: editedProducts ? true : false,
  });

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert('Error', 'Some error in the form');
      return;
    }
    debugger;
    if (editedProducts) {
      dispatch(
        productAction.updateProduct(
          id,
          formState.inputValues.title,
          formState.inputValues.imageUrl,
          formState.inputValues.description,
        ),
      );
    } else {
      dispatch(
        productAction.createProduct(
          formState.inputValues.title,
          formState.inputValues.imageUrl,
          parseFloat(formState.inputValues.price),
          formState.inputValues.description,
        ),
      );
    }
  }, [dispatch, id, formState]);

  useEffect(() => {
    navigation.setParams({submitAction: submitHandler});
  }, [submitHandler]);

  const textChangeHandler = (inputIdentifier, text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid: isValid,
      input: inputIdentifier,
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{...styles.inputContainer, marginTop: 30}}>
          <Text style={styles.inputTitleStyle}>Title:</Text>
          <TextInput
            value={formState.inputValues.title}
            style={styles.txtInputStyle}
            onChangeText={(text) => textChangeHandler('title', text)}
            autoCapitalize="sentences"
          />
          {!formState.inputValues.title && (
            <Text>Please input a valid title</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitleStyle}>Image Url:</Text>
          <TextInput
            style={styles.txtInputStyle}
            value={formState.inputValues.imageUrl}
            onChangeText={(text) => textChangeHandler('imageUrl', text)}
          />
        </View>
        {editedProducts ? null : (
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitleStyle}>Price:</Text>
            <TextInput
              style={styles.txtInputStyle}
              value={formState.inputValues.price}
              onChangeText={(text) => textChangeHandler('price', text)}
              keyboardType="decimal-pad"
            />
          </View>
        )}
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitleStyle}>Description:</Text>
          <TextInput
            style={styles.descInputTxtStyle}
            value={formState.inputValues.description}
            onChangeText={(text) => textChangeHandler('description', text)}
            multiline={true}
            autoCorrect={false}
          />
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
    flexDirection: 'column',
    margin: 10,
    justifyContent: 'space-between',
  },
  inputTitleStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textInputViewContainer: {
    height: 40,
  },
  descInputTxtStyle: {
    marginTop: 10,
    height: 150,
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 6,
    borderColor: Colors.accentColor,
    borderWidth: 1,
    justifyContent: 'flex-start',
  },
  txtInputStyle: {
    marginTop: 10,
    height: 40,
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 6,
    borderColor: Colors.accentColor,
    borderWidth: 1,
  },
});

export default EditProductScreen;
