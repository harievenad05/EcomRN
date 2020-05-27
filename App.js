import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

const App = (props) => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Text>This is App Component</Text>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
