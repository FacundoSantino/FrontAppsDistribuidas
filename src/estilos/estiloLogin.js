
import React from "react";
import { StyleSheet } from "react-native";

const estiloLogin = StyleSheet.create ({

  ingreseUsuarioTitulo:{
    fontWeight:"bold",
    textAlign:"center",
    color:"#000000",
    fontSize:20,
  },

  Restablecer:{
    marginTop:100,
  },


  recuperarPass:{
    alignSelf: 'center',
    top: 200,
  },
  registrarme:{
    top: '40%',
    alignSelf: 'center',
    color: 'black',
    textAlign:"center",
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Sombra negra con una opacidad del 75%
    textShadowOffset: { width: 5, height: 5 }, // Desplazamiento de la sombra: 1 píxel a la derecha y 1 píxel hacia abajo
  },
  
  button: {
    padding: 10,
    borderRadius: 25, // Aquí aplicamos el borderRadius
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  buttonLoginStyle:{
    backgroundColor: '#D69D20'
  },
  buttonViewContainer:{
    
    alignSelf: 'center',
    top: 180,
    width:180,
  },
  containerCheckBox:{
    position:'absolute',
    left: 180,
    top: 230,
    width:180
  },
  iconoCheckBox:{
    width:30,
    height:30
  },

  loginCheckBox:{
    borderRadius:45,
    height: 20,
    width:50,
    backgroungColor:'red'
  },
  loginBox: {
    display:"flex",
    height:"35%",
    width:"100%",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
  },
  contentInput: {
    paddingLeft:30,
  },
  imagen: {
    position: 'absolute',
    alignSelf: 'center',
    top:-100,
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  iconoLogin: {
    position: 'absolute',
    top:7,
    left:10,
    zIndex: 0,
    width: 28,
    height: 28,
  },
  textoRojo:{
    position: 'absolute',
    color: "red",
    fontWeight:"bold",
    textAlign:"center",
    fontSize:20,
    top:88,
    left:52,
  },
  container: {
    flex: 1,
    borderRadius: 0,
    overflow: 'hidden',
  },
  bgHeaderPrincipal:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F0AF23',
    height: 200,
  },  
  bgPrincipal: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 30,
    height: 1000,
    top: 180,
    left: 0,
    right: 0,
  },
  inputTextLogin: {
    position: 'relative',
    borderRadius: 45,
    paddingLeft: 20,
    top: 120,
    height: 40,
    width: 250,
    alignSelf: 'center',
    backgroundColor: '#D9D9D9',
    marginBottom:20,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    Top: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },

 
});


export default estiloLogin;