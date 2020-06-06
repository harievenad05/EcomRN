//import liraries
import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import Colors from '../../constants/Colors';

// create a component
const EditProductScreen = ({route, navigation}) => {
  const {id} = route.params;
  let editedProducts = null;
  if (id) {
    editedProducts = useSelector((state) =>
      state.products.userProducts.find((prod) => prod.id === id),
    );
  }

  const [title, setTitle] = useState(
    editedProducts ? editedProducts.title : '',
  );
  const [imageUrl, setImageUrl] = useState(
    editedProducts ? editedProducts.imageUrl : '',
  );
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState(
    editedProducts ? editedProducts.description : '',
  );
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{...styles.inputContainer, marginTop: 30}}>
          <Text style={styles.inputTitleStyle}>Title:</Text>
          <TextInput
            value={title}
            style={styles.txtInputStyle}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitleStyle}>Image Url:</Text>
          <TextInput
            style={styles.txtInputStyle}
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
          />
        </View>
        {editedProducts ? null : (
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitleStyle}>Price:</Text>
            <TextInput
              style={styles.txtInputStyle}
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
          </View>
        )}
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitleStyle}>Description:</Text>
          <TextInput
            style={styles.descInputTxtStyle}
            value={description}
            onChangeText={(text) => setDescription(text)}
            multiline={true}
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
