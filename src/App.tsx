/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useRef, useState } from 'react';
import Login from './pantallas/Login';
import Home from './pantallas/Home';
import Carousel from './pantallas/Carousel';
import MisRecetas from './pantallas/MisRecetas';
import Codigo from './pantallas/subpantallasLogin/Codigo';
import IngresarUsuarioRestablecer from './pantallas/subpantallasLogin/IngresarUsuarioRestablecer';
import RestablecerContrasenia from './pantallas/subpantallasLogin/RestablecerContrasenia';
import MisGuardadas from './pantallas/subpantallasLogin/MisGuardadas';
import Registrar from './pantallas/subpantallasLogin/Registrar';
import MisCategorias from './pantallas/subpantallasLogin/MisCategorias'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginSinConexion from './pantallas/subpantallasLogin/LoginSinConexion';
import RecetasXChef from './pantallas/subpantallasLogin/RecetasXChef';
import RecetasOffline from './pantallas/RecetasOffline';
import RecetasXTipo from './pantallas/RecetasXTipo';
import PantallaReceta from './pantallas/PantallaReceta';
import { ImageSourcePropType } from 'react-native';
import Receta from './componentes/Receta';
import Ingredientes from './componentes/Ingredientes';

export var localip = "192.168.0.9"
export enum TipoItem{
  RECETA,
  TIPO,
  RECETANOMBRE,
  AUTOR,
  INGREDIENTE
}

export type TipoParametros = {
  PantallaReceta: {  
    tipo: TipoItem,
    verIngredientes: Boolean,
    permitirEliminacion: Boolean,
    permitirAgregacion: Boolean,
    titulo: String,
    contenido: Autor[] | Receta[] | Tipo[] ,
    ingredientes?: Ingrediente[]
  },
  Receta:{
    tipoPantalla:TipoPantalla,
    titulo:String,
    contenido: Receta,
    pasos: Paso[]
  }
  ,
  Ingredientes:{
    ingredientes: Ingrediente[],
    idReceta:number,
    nombreReceta:string
  },
  Home : {
    user:String
  },
  Contra:{
    idUser:number
  }
}

export interface Paso{
  idPaso:number,
  idReceta: Receta,
  nroPaso:number,
  multimedia: Multimedia | null,
  texto: string,
}

export interface Multimedia{
  idContenido: number,
  tipo_contenido:string,
  extension:string,
  urlContenido:string
}

export enum TipoPantalla{
  MILISTA,
  NOMILISTA
}



export interface Autor {
  idUsuario: number,
  mail:String,
  nickname:String,
  habilitado:String,
  nombre:String,
  avatar: string,
  tipo_usuario: String
}

export interface Foto {
  idFoto:number,
  urlFoto:string,
  extension:String
}

export interface Tipo {
  idTipo: number,
  descripcion:String,
  urlFoto: string
}

export interface Receta {
  idReceta:number,
  usuario:Autor,
  nombre:String,
  descripcion:String,
  fotos:Foto[],
  porciones:number,
  cantidadPersonas:number,
  tipo: Tipo
}

export interface Ingrediente{
  idIngrediente:number,
  nombre:String
}

export interface Utilizado{
  idUtilizado:number,
  receta:Receta,
  idIngrediente:Ingrediente,
  cantidad:number,
  unidad: Unidad,
  observaciones: String
}

export interface Unidad{
  idUnidad: number,
  descripcion: String
}


const Stack =createStackNavigator<TipoParametros>();



function App(): JSX.Element {
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
        <Stack.Screen name="MisGuardadas" component={MisGuardadas}/>
        <Stack.Screen name="MisCategorias" component={MisCategorias}/>
        <Stack.Screen name="RecetasXChef" component={RecetasXChef}/>
        <Stack.Screen name="RecetasOffline" component={RecetasOffline}/>
        <Stack.Screen name="RecetasXTipo" component={RecetasXTipo}/>
        <Stack.Screen name="PantallaReceta" component={PantallaReceta} initialParams={{titulo:"Hola"}}/>
        <Stack.Screen name="Receta" component={Receta}/>
        <Stack.Screen name="Ingredientes" component={Ingredientes}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;


