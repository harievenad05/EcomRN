//import liraries
import React, {useEffect, useCallback, useReducer} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Alert
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../../constants/Colors';
import * as productAction from '../../store/actions/products';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, action) => {
  if(action.type === FORM_INPUT_UPDATE){

  }
}

const EditProductScreen = ({route, navigation}) => {
  const {id} = route.params;
  const dispatch = useDispatch();

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

  let editedProducts = null;
  if (id) {
    editedProducts = useSelector((state) =>
      state.products.userProducts.find((prod) => prod.id === id),
    );
  }

  const submitHandler = useCallback(() => {
    if(!isTitleValid){
      Alert.alert('Title', 'Title should not be empty');
      return;
    }
    debugger;
    if (editedProducts) {
      dispatch(productAction.updateProduct(id, title, imageUrl, description));
    } else {
      dispatch(
        productAction.createProduct(
          title,
          imageUrl,
          parseFloat(price),
          description,
        ),
      );
    }
  }, [dispatch, id, title, imageUrl, price, description, isTitleValid]);

  useEffect(() => {
    navigation.setParams({submitAction: submitHandler});
  }, [submitHandler]);

  const textChangeHandler = (inputIdentifier, text) => {

    let isValid = false;
    if(text.trim().length > 0){
      isValid = true;
    } else {

    }
    dispatchFormState({ type: FORM_INPUT_UPDATE, value: text, isValid: isValid, input: inputIdentifier})
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{...styles.inputContainer, marginTop: 30}}>
          <Text style={styles.inputTitleStyle}>Title:</Text>
          <TextInput
            value={title}
            style={styles.txtInputStyle}
            onChangeText={textChangeHandler.bind(this, 'title')}
            autoCapitalize='sentences'
            onEndEditing={() => console.log('onEnd Editing')}
          />
          {!isTitleValid && <Text>Please input a valid title</Text>}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitleStyle}>Image Url:</Text>
          <TextInput
            style={styles.txtInputStyle}
            value={imageUrl}
            onChangeText={textChangeHandler.bind(this, 'imageUrl')}
          />
        </View>
        {editedProducts ? null : (
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitleStyle}>Price:</Text>
            <TextInput
              style={styles.txtInputStyle}
              value={price}
              onChangeText={textChangeHandler.bind(this, 'price')}
              keyboardType='decimal-pad'
            />
          </View>
        )}
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitleStyle}>Description:</Text>
          <TextInput
            style={styles.descInputTxtStyle}
            value={description}
            onChangeText={textChangeHandler.bind(this, 'description')}
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
    justifyContent: 'flex-start'
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
