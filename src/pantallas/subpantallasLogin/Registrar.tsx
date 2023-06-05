import { CheckBox } from 'react-native-elements';
import React, { useRef, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import fotoCheck from '../../assets/checkbox.png';
import fotoUnchecked from '../../assets/unchecked.png';
import IconoUsuario from "../../assets/IconoUsuario.png";
import IconoContrasenia from "../../assets/IconoContrasenia.png";
import { Animated } from 'react-native';
import estilos from '../../estilos/estiloLogin';
import { useNavigation } from '@react-navigation/native';
import PantallaTipoLogin from '../../componentes/PantallaTipoLogin';
import { localip } from '../../App';
import Modal from "react-native-modal";
import Lupa from '../../assets/lupa.png';
import IconoCruz from '../../assets/cruz.png';
import Check from '../../assets/check-mark.png';

interface LoginInicialProps {
  funcionDireccion: (direccion : string) => void;
}
export default function LoginInicial({ funcionDireccion }: LoginInicialProps) {
  const [mail, setMail]=useState("");
  const [error,setError] = useState("");
  const [user, setUser]=useState("");
  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);
  const [levantada, setLevantada] = useState(false);
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
  const intervalo =setInterval( () => isInternetReachable(),10000);
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

  const urlRegister = 'http://' + localip + ':8080/api/rest/morfar/register';
  const registerDTO = {
    mail: mail,
    user: user
  };
  const registerFetch= async () =>{
    try{
      const respuesta= await fetch(urlRegister, {     
        method: 'POST',
        body: JSON.stringify(registerDTO),
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
  const handleRegister = async () => {
    console.log("Manejando Registro");
    registerFetch()
      .then(async data => {
        setError("");
        if (data == 200) {
          setLevantada(true);
          setTimeout(()=>{
            navigation.navigate("Login" as never);
          },5000)
        } else {
          if(data == 0){
            navigation.navigate("LoginSinConexion" as never);
          }
          else{
            if (data == 400){
              setError("El mail o el usuario ya existe.")
            }
          }
        }
      }).catch(error => console.log(error));
  };
  const CustomButton = ({ onPress, title, color }: { onPress: () => void; title: string; color: string }) => (
    <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: color }]}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
  return (
    <PantallaTipoLogin contenido={
      <View style={styles.container}>
        <Text style={[styles.ingreseUsuarioTitulo,styles.Restablecer]}> REGISTRARSE </Text>
        <View style={styles.inputTextLogin}>
          <Image source={IconoUsuario} style={styles.iconoLogin} />
          <TextInput value={mail} placeholder="Ingrese su mail" style={styles.contentInput} onChange={e => setMail(e.nativeEvent.text)}></TextInput>
        </View>
        <View style={styles.inputTextLogin}>
          <Image source={IconoContrasenia} style={styles.iconoLogin} />
          <TextInput value={user} placeholder="Ingrese su usuario" style={styles.contentInput} onChange={e => setUser(e.nativeEvent.text)}></TextInput>
        </View>
        <Text>{error}</Text>
        <View style={styles.buttonViewContainer}>
          <CustomButton
            title="Registrarme"
            color="#D69D20"
            onPress={async () => {
              if(await isInternetReachable()){handleRegister()};
            }}
          />
        </View>
        <Modal isVisible = {levantada}>
          <View style={{display:'flex',flexDirection:'column',width:370,height:200,backgroundColor:'#FCB826',borderRadius:20}}>
          <TouchableOpacity onPress={()=>setLevantada(false)} style={{display:'flex',justifyContent:'center',alignItems:'flex-start',height:30,width:340}}>
              <Image source={IconoCruz} style={{width:20,height:20,marginLeft:10}}/>
            </TouchableOpacity>
            <View style={{display:'flex',flexDirection:'column',width:370,height:150,justifyContent:'center',alignItems:'center'}}>
            <Image source={Check} style={{width:40,height:40}}/>
              <Text style={{fontSize:20,color:'black'}}>¡Felicitaciones!</Text>
              <Text style={{fontSize:16,color:'black',width:300,textAlign:'center'}}>Se le ha enviado una contrasaña autogenerada a su mail. En caso de no encontrarla, revise la sección de spam.</Text>
            </View>
          </View>
        </Modal>
    
      </View>
    }/>
  )
}

const styles = StyleSheet.create(estilos);
