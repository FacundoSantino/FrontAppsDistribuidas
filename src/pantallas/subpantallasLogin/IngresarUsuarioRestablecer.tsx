import React, { useRef, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import IconoUsuario from "../../assets/IconoUsuario.png";
import { Animated } from 'react-native';
import estilos from '../../estilos/estiloLogin';
import { useNavigation } from '@react-navigation/native';
import PantallaTipoLogin from '../../componentes/PantallaTipoLogin';
import { localip } from '../../App';
import IconoCruz from '../../assets/cruz.png';
import Modal from "react-native-modal";
import Lupa from '../../assets/lupa.png';
interface LoginInicialProps {
  funcionDireccion: (direccion : string) => void;
}
export default function LoginInicial({ funcionDireccion }: LoginInicialProps) {
  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [user, setUser] = useState("");
  const [error,setError] = useState("");
  const [levantada, setLevantada] = useState(false);

  const urlBase="http://"+localip+":8080/api/rest/morfar";
  const urlEnviarCodigo=urlBase+"/enviarCodigo/";
  
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
  const fetchEnviarCodigo= async () => {
    try{
      const response = await fetch(urlEnviarCodigo+user);
      const data=await response.json();
      console.log("CODIGO GENERADO Y ENVIADO:");
      console.log(await data);
    }
    catch{

    }
  }
  const CustomButton = ({ onPress, title, color }: { onPress: () => void; title: string; color: string }) => (
    <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: color }]}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
  const verifyUserFetch = async ()=>{
      const respuesta = await fetch("http://"+localip+":8080/api/rest/morfar/getUsers/"+user);
      const estado = await respuesta.status;
      return(estado==200);
  }
  const handleVerifyUser = async () => {
    console.log("Manejando verify user");
    verifyUserFetch()
      .then(async verdadero => {
        setError("");
        if (verdadero) {
          fetchEnviarCodigo();
          navigation.navigate("Codigo" as never,{user:user} as never );
        } else {
          setLevantada(true);
          setError("El mail o el usuario no existe.")
        }
      }).catch(error => console.log(error));
  };
  return (
    <PantallaTipoLogin contenido={
    <View style={styles.loginBox}>

        <Text style={styles.ingreseUsuarioTitulo}> INGRESE USUARIO </Text>
        <View style={styles.inputTextLogin}>
            <Image source={IconoUsuario} style={styles.iconoLogin} />
        <TextInput placeholder="Ingrese su usuario" value={user} onChange={e=>setUser(e.nativeEvent.text)} style={styles.contentInput}></TextInput>
        </View>
            <View style={styles.buttonViewContainer}>
                <CustomButton
                title="Verificar"
                color="#D69D20"
                onPress={()=> {handleVerifyUser()}}
            />
        </View>
        <Modal isVisible = {levantada}>
          <View style={{display:'flex',flexDirection:'column',width:370,height:200,backgroundColor:'#FCB826',borderRadius:20}}>
            <TouchableOpacity onPress={()=>setLevantada(false)} style={{display:'flex',justifyContent:'center',alignItems:'flex-start',height:30,width:340}}>
              <Image source={IconoCruz} style={{width:20,height:20,marginLeft:10}}/>
            </TouchableOpacity>
            <View style={{display:'flex',flexDirection:'column',width:370,height:150,justifyContent:'center',alignItems:'center'}}>
            <Image source={Lupa} style={{width:40,height:40}}/>
              <Text style={{fontSize:20,color:'black'}}>Ups!</Text>
              <Text style={{fontSize:16,color:'black'}}>El usuario ingresado es inexistente, por favor intentelo nuevamente.</Text>
            </View>
          </View>
        </Modal>

    </View>
    }
    />
  )
}

const styles = StyleSheet.create(estilos);
