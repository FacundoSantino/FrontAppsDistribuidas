/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useRef, useState } from 'react';
import Login from './pantallas/Login'
import Home from './pantallas/Home'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack =createStackNavigator();


function App(): JSX.Element {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}  initialRouteName={"Login"}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Home" component={Home}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;
