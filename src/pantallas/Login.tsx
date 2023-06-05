import React, { useRef, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Animated} from 'react-native';
import estilos from '../estilos/estiloLogin';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import LogoSol from "../assets/Logo_Sol_Bueno.png";
import RestablecerContrasenia from "./subpantallasLogin/IngresarUsuarioRestablecer"
import Codigo from "./subpantallasLogin/Codigo"
import LoginSinConexion from './subpantallasLogin/LoginSinConexion';
import PantallaTipoLogin from '../componentes/PantallaTipoLogin';
import fotoCheck from '../assets/checkbox.png';
import fotoUnchecked from '../assets/unchecked.png';
import IconoUsuario from "../assets/IconoUsuario.png";
import IconoContrasenia from "../assets/IconoContrasenia.png";
import { CheckBox } from 'react-native-elements';
import { TipoParametros, localip } from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';




function Login(): JSX.Element{

    const navigation=useNavigation();
    const [checked,setChecked] = useState(false);
    const [tieneConexion,setTieneConexion]=useState(true);
    const animatedValue = useRef(new Animated.Value(0)).current;
    const [usuario, setUsuario]=useState("");
    const [contra, setContra]=useState("");
    const [error, setError] = useState("");
   
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

    const isInternetReachable = async () => {
      try {
        const response = await fetch('https://www.google.com/');
        return true;
      } catch (error) {
        navigation.navigate("LoginSinConexion" as never);
        navigation.reset;
        clearInterval(intervalo);
        return false;
      }
    };
    const intervalo =setInterval( () => isInternetReachable(),10000);

    const urlLogin = 'http://' + localip + ':8080/api/rest/morfar/login';
    const loginDTO = {
      user: usuario,
      password: contra
    };

    const loginFetch= async () =>{
      try{
        const respuesta= await fetch(urlLogin, {     
          method: 'POST',
          body: JSON.stringify(loginDTO),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const status = await respuesta.status;
        return status;
      } catch(err){
        console.log(err);
      }
      
    }

    const handleLogin = async () => {
      console.log("Manejando login");
      loginFetch()
        .then(async data => {
          setError("");
          if (data == 200) {
            navigation.navigate("Home" as never,{user:usuario} as never);
          } else {
            if(data == 0){
              navigation.navigate("LoginSinConexion" as never);
            }
            else{
              if (data == 400){
                setError("El usuario o la contraseña son incorrectos.")
              }
            }
          }
        }).catch(error => console.log(error));
    };

    return(
        
      <PantallaTipoLogin contenido={
        <View style={styles.container}>
        <View style={styles.inputTextLogin}>
          <Image source={IconoUsuario} style={styles.iconoLogin} />
          <TextInput defaultValue='Juanito' value={usuario} onChange={e => setUsuario(e.nativeEvent.text)} placeholder="Ingrese su usuario" style={styles.contentInput}></TextInput>
        </View>
        <View style={styles.inputTextLogin}>
          <Image source={IconoContrasenia} style={styles.iconoLogin} />
          <TextInput defaultValue="123" value={contra} placeholder="Ingrese su contraseña" onChange={e => setContra(e.nativeEvent.text)} secureTextEntry={true} style={styles.contentInput}></TextInput>
        </View>
        <Text style={styles.textoErrorLogin}>{error}</Text>
        <View style={styles.containerCheckBox}>
          <CheckBox
            containerStyle={{ borderWidth: 0, backgroundColor: 'white' }}
            center
            title='Recordarme'
            checkedIcon={
              <Animated.View style={animatedIconStyle}><Image style={styles.iconoCheckBox} source={fotoCheck} /></Animated.View>
            }
            uncheckedIcon={<Image style={styles.iconoCheckBox} source={fotoUnchecked} />}
            checked={checked}
            onPress={() => { setChecked(!checked) }}
          />
        </View>
        <View style={styles.buttonViewContainer}>
          <CustomButton
            title="Iniciar sesión"
            color="#D69D20"
            onPress={async () =>{if(await isInternetReachable()){handleLogin()};}}
          />
        </View>
        
        <Text style={styles.recuperarPass} onPress={async () =>{if(await isInternetReachable()){navigation.navigate("IngresarUsuarioRestablecer" as never)};}}>Restablecer contraseña</Text>
        <Text style={styles.registrarme} onPress={async () =>{if(await isInternetReachable()){navigation.navigate("Registrar" as never)};}}>REGISTRARME</Text>
        
      </View>
      }/>    
      
      );
}

const styles = StyleSheet.create(estilos);

export default Login;