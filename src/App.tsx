/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useRef, useState } from 'react';
import Login from './pantallas/Login'
import Home from './pantallas/Home'
import Carousel from './pantallas/Carousel'
import MisRecetas from './pantallas/MisRecetas'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack =createStackNavigator();



function App(): JSX.Element {
  function funcionDireccion(direccion:string){
    console.log(direccion);
    let content = null;
    switch(direccion){
      case "Home":
        console.log("Es el caso");
        content = <Home/>;
    }
    return content;
  };
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}  initialRouteName={"Login"}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="carousel" component={Carousel}/>
        <Stack.Screen name="MisRecetas" component={MisRecetas}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;
