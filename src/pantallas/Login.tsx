import React, { useRef, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Animated } from 'react-native';
import estilos from '../estilos/estiloLogin';
import { useNavigation } from '@react-navigation/native';
import LogoSol from "../assets/Logo_Sol_Bueno.png";
import LoginInicial from "./subpantallasLogin/LoginInicial";
import RestablecerContrasenia from "./subpantallasLogin/IngresarUsuarioRestablecer"
import Codigo from "./subpantallasLogin/Codigo"
import LoginSinConexion from './subpantallasLogin/LoginSinConexion';
import PantallaTipoLogin from '../componentes/PantallaTipoLogin';

function Login(): JSX.Element{
  let funcionDireccion = (direccion:string) => {
    console.log(direccion);
    switch(direccion){
      case "SinConexion":
        console.log("Sin conexion")
      case "ConConexion":
        console.log("Con conexion")
    }
    console.log(contenido);
  };

  const isInternetReachable = async () => {
    try {
      const response = await fetch('https://www.google.com/');
      return response.status === 200;
    } catch (error) {
      return false;
    }
  };

    const navigation=useNavigation();
    const [checked,setChecked] = useState(false);
    const [contenido, setContenido] = useState(<LoginInicial funcionDireccion={funcionDireccion} />);
    const [tieneConexion,setTieneConexion]=useState(true);
    const animatedValue = useRef(new Animated.Value(0)).current;


    
    const interpolateColor = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['#517fa4', '#00aced'],
    });
    const animatedIconStyle = {
      color: interpolateColor,
      transform: [
        {
          scale: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.2],
          }),
        },
      ],
    };
    const CustomButton = ({ onPress, title, color }: {onPress:any,title:any,color:any}) => (
      <TouchableOpacity onPress={onPress} style={[styles.button, {backgroundColor: color}]}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );

    async function chequeoInternet() {
      const isOnline = await isInternetReachable();
      if (!isOnline && tieneConexion) {
        setContenido(<LoginSinConexion funcionDireccion={funcionDireccion} />);
        setTieneConexion(false) 
      }
      else if(isOnline && !tieneConexion){
        setContenido(<LoginInicial funcionDireccion={funcionDireccion} />);
        setTieneConexion(true);
      }
    };

    chequeoInternet();

    if(!tieneConexion){
      setInterval(() => chequeoInternet(),10000);
    }

    return(
        
      <PantallaTipoLogin contenido={contenido}/>    
      
      );
}

const styles = StyleSheet.create(estilos);

export default Login;