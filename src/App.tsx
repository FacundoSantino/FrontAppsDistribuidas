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
import Codigo from './pantallas/subpantallasLogin/Codigo'
import IngresarUsuarioRestablecer from './pantallas/subpantallasLogin/IngresarUsuarioRestablecer'
import RestablecerContrasenia from './pantallas/subpantallasLogin/RestablecerContrasenia'
import misGuardadas from './pantallas/subpantallasLogin/misGuardadas'
import Registrar from './pantallas/subpantallasLogin/Registrar'
import MisCategorias from './pantallas/subpantallasLogin/MisCategorias'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginSinConexion from './pantallas/subpantallasLogin/LoginSinConexion';
import RecetasXChef from './pantallas/subpantallasLogin/RecetasXChef';
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
        <Stack.Screen name="IngresarUsuarioRestablecer" component={IngresarUsuarioRestablecer}/>
        <Stack.Screen name="Codigo" component={Codigo}/>
        <Stack.Screen name="carousel" component={Carousel}/>
        <Stack.Screen name="MisRecetas" component={MisRecetas}/>
        <Stack.Screen name="RestablecerContrasenia" component={RestablecerContrasenia}/>
        <Stack.Screen name="Registrar" component={Registrar}/>
        <Stack.Screen name="LoginSinConexion" component={LoginSinConexion}/>
        <Stack.Screen name="misGuardadas" component={misGuardadas}/>
        <Stack.Screen name="MisCategorias" component={MisCategorias}/>
        <Stack.Screen name="RecetasXChef" component={RecetasXChef}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;
