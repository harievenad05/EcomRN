import React, {useReducer, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Colors from '../../constants/Colors';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        tapped: true,
      };
    default:
      return state;
  }
};

const TxtInput = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initiallyValid,
    tapped: false,
  });

  const {onInputChange} = props;

  useEffect(() => {
    if (inputState.tapped) {
      onInputChange(inputState.value, inputState.isValid);
    }
  }, [inputState]);

  const textChangeHandler = (text) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    dispatch({type: INPUT_CHANGE, value: text, isValid: isValid});
  };

  const textUnFocusHandler = () => {
    dispatch({type: INPUT_BLUR});
  };
  return (
    <View style={{...styles.inputContainer, ...props.style}}>
      <Text style={styles.inputTitleStyle}>{props.label}</Text>
      <TextInput
        {...props}
        value={formState.inputValues.title}
        style={styles.txtInputStyle}
        onChangeText={textChangeHandler}
        onBlur={textUnFocusHandler}
      />
      {!formState.inputValues.title && <Text>{props.errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'column',
    margin: 10,
    justifyContent: 'space-between',
  },
  inputTitleStyle: {
    fontSize: 18,
    fontWeight: 'bold',
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

export default TxtInput;
