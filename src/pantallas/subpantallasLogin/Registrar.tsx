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
import email from '../../assets/email.png';

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
  const[levantadaMail,setLevantadaMail]=useState(false);
  const [sugerenciasUsuario,setSugerenciasUsuario]=useState([]);
  const [sugerenciasVisible,setSugerenciasVisible]=useState(false);
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
  const urlBase = 'http://' + localip + ':8080/api/rest/morfar/';
  const urlRegister = 'http://' + localip + ':8080/api/rest/morfar/register';
  const urlMail = 'http://' + localip + ':8080/api/rest/morfar/getUsers/';
  const urlUsuario = 'http://' + localip + ':8080/api/rest/morfar/getUsers/';
  const urlSugerencias='http://' + localip + ':8080/api/rest/morfar/'+"getUserSuggestions/";
  const registerDTO = {
    mail: mail,
    user: user
  };

  const usuarioFetch= async (usuario:string) => {
    try{
      const respuesta = await fetch(urlUsuario+usuario);
      const status = await respuesta.status;
      return status == 200;
    }
    catch(error){
      console.log(error);
    }
  }

  const sugerenciasFetch= async (usuario:string) => {
    try{
      const respuesta=await fetch(urlSugerencias+usuario);
      const data=respuesta.json();
      return data;
    }
    catch(error){
      console.log(error);
    }
  }

  const mailFetch= async (mail:string) => {
    try{
      const respuesta = await fetch(urlMail+mail); 
      const status = await respuesta.status; 
      return status==200; 
    } catch(e) {
      console.log(e);
    }
  }
  
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

  const fetchEnviarExisteMail = async () => {
    try {
      
      fetch(urlBase+"mailExistente/"+mail);
    } catch (error) {
      console.log(error);
    }
  }
  
  const handleRegister = async () => {
    //fetch del usuario, si da 200 es true si no false

    const existeUsuario=await usuarioFetch(registerDTO.user);
    

    //fetch del mail, si da 200 es true, si no false

    const existeMail=await mailFetch(registerDTO.mail);

 
    if(!existeMail && !existeUsuario){
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
      }
      
      else{
        if(await existeMail){
          setLevantadaMail(true);
          fetchEnviarExisteMail();
        }
        else if(await existeUsuario){
          //muestro que el usuario ya existe y llamo a sugerencias
          const sugerencias=await sugerenciasFetch(registerDTO.user);
          console.log(sugerencias);
          //despues, las muestro y las hago clickeables
          setSugerenciasUsuario(sugerencias);
          setSugerenciasVisible(true);

        }
      }
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
          <Image source={email} style={styles.iconoLogin} />
          <TextInput value={mail} placeholder="Ingrese su mail" style={styles.contentInput} onChange={e => setMail(e.nativeEvent.text)}></TextInput>
        </View>
        <View style={styles.inputTextLogin}>
          <Image source={IconoUsuario} style={styles.iconoLogin} />
          <TextInput value={user} placeholder="Ingrese su usuario" style={styles.contentInput} onChange={e => setUser(e.nativeEvent.text)}></TextInput>
        </View>
        {sugerenciasVisible? 
          <View style={{display:'flex',flexDirection:'column',marginTop:345,position:'absolute',marginLeft:68}}>
              <Text style={{color:'red',fontSize:17,alignSelf:'center'}}>El usuario ingresado ya está en uso.</Text>
              <View style={{display:'flex',flexDirection:'column'}}>
                <Text style={{alignSelf:'flex-start',marginLeft:20,fontSize:15,color:'black'}}>Te sugerimos:</Text>
                {
                  sugerenciasUsuario.map((item,i) => (
                    <TouchableOpacity  onPress={() => {setUser(item);setSugerenciasVisible(false);}} key={i}><Text style={{marginLeft:30,color:'blue',textDecorationLine:"underline"}}>{item}</Text></TouchableOpacity>
                  )) 
                }
              </View>
          </View>
        : null}
        <View style={[styles.buttonViewContainer,{marginTop:30,marginRight:10}]}>
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
        <Modal isVisible = {levantadaMail}>
          <View style={{display:'flex',flexDirection:'column',width:370,height:200,backgroundColor:'#FCB826',borderRadius:20}}>
          <TouchableOpacity onPress={()=>setLevantadaMail(false)} style={{display:'flex',justifyContent:'center',alignItems:'flex-start',height:30,width:340}}>
              <Image source={IconoCruz} style={{width:20,height:20,marginLeft:10}}/>
            </TouchableOpacity>
            <View style={{display:'flex',flexDirection:'column',width:370,height:150,justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontSize:20,color:'black'}}>¡Ups!</Text>
              <Text style={{fontSize:16,color:'black',width:300,textAlign:'center'}}>El mail ingresado ya existe, se le ha enviado un codigo al mismo para recuperar su cuenta.</Text>
            </View>
          </View>
        </Modal>
      </View>
    }/>
  )
}

const styles = StyleSheet.create(estilos);
