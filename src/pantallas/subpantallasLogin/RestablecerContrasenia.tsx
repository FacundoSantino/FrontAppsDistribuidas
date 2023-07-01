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
import Modal from "react-native-modal";
import fotoCheck from '../../assets/checkbox.png';
import fotoUnchecked from '../../assets/unchecked.png';
import IconoUsuario from "../../assets/IconoUsuario.png";
import IconoContrasenia from "../../assets/IconoContrasenia.png";
import { Animated } from 'react-native';
import estilos from '../../estilos/estiloLogin';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import PantallaTipoLogin from '../../componentes/PantallaTipoLogin';
import { TipoParametros, localip } from '../../App';
import IconoCruz from '../../assets/cruz.png';



interface LoginInicialProps {
  funcionDireccion: (direccion : string) => void;
}
type ContraProps = RouteProp<TipoParametros,'Contra'>;
export default function LoginInicial({ funcionDireccion }: LoginInicialProps) {
  const navigation = useNavigation();
  const route = useRoute<ContraProps>();
  const [loaded, setLoaded] = useState(false);
  const [udata, setUdata] = useState({});
  const [error, setError] = useState("");
  const [levantada, setLevantada] = useState(false);
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
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
  React.useEffect(()=>{
    setLoaded(false);
    fetch('http://'+localip+':8080/api/rest/morfar/getUsers/'+route.params.user)
    .then((r) => r.json())
    .then((d)=> setUdata(d))
    .finally(()=>setLoaded(true));
  },[])
  const fetchReset = async()=>{
    const respuesta = fetch("http://"+localip+":8080/api/rest/morfar/restorePass",
    {     
      method: 'PUT',
      body: JSON.stringify(
      {
        "idUser" : udata.idUsuario,
        "password1" : password,
        "password2" : repassword
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    )
    return (await respuesta).status;
  }
  const handleReset = async ()=>{
    if(password===repassword){
      await fetchReset()
      .then(status =>{
        if (status == 200){
          setLevantada(true);
          setTimeout(()=>{
            navigation.navigate("Login" as never);
          },3000);
          
        } else{
          setError("Error al cambiar las contraseñas");
        }
      }).catch(()=>setError("Error al cambiar las contraseñas"))
    }
    else{
      setError("Las contraseñas son distintas")
    }    
  }
  const CustomButton = ({ onPress, title, color }: { onPress: () => void; title: string; color: string }) => (
    <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: color }]}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
  
  return (
    <PantallaTipoLogin contenido={  
      <View style={styles.container}>
        <Text style={[styles.ingreseUsuarioTitulo,styles.Restablecer]}> RESTABLECER CONTRASEÑA </Text>
        <Text>{error}</Text>
        <View style={styles.inputTextLogin}>
          <Image source={IconoContrasenia} style={styles.iconoLogin} />
          <TextInput value = {password} onChange={(e)=>setPassword(e.nativeEvent.text)} placeholder="Ingresar contraseña" secureTextEntry={true} style={styles.contentInput}></TextInput>
        </View>
        <View style={styles.inputTextLogin}>
          <Image source={IconoContrasenia} style={styles.iconoLogin} />
          <TextInput value = {repassword} onChange={(e)=>setRepassword(e.nativeEvent.text)} placeholder="Ingresar contraseña" secureTextEntry={true} style={styles.contentInput}></TextInput>
        </View>
        {(loaded)?
        <View style={styles.buttonViewContainer}>
          <CustomButton
            title="RESTABLECER"
            color="#D69D20"
            onPress={() => {handleReset()}}
          />
        </View>
        :null}
        {/*--------------------MODAL---------------------------*/}
        <Modal isVisible = {levantada}>
          <View style={{display:'flex',flexDirection:'column',width:370,height:200,backgroundColor:'#FCB826',borderRadius:20}}>
            <TouchableOpacity onPress={()=>setLevantada(false)} style={{display:'flex',justifyContent:'center',alignItems:'flex-start',height:30,width:340}}>
              <Image source={IconoCruz} style={{width:20,height:20,marginLeft:10}}/>
            </TouchableOpacity>
            <View style={{display:'flex',flexDirection:'column',width:370,height:150,justifyContent:'center',alignItems:'center'}}>
            <Image source={IconoContrasenia} style={{width:40,height:40}}/>
              <Text style={{fontSize:20,color:'black'}}>Felicitaciones!</Text>
              <Text style={{fontSize:16,color:'black'}}>El cambio de contraseña ha sido exitoso.</Text>
            </View>
          </View>
        </Modal>
        <Modal isVisible = {error!=""} animationInTiming={1000}>
          <View style={{display:'flex',flexDirection:'column',width:370,height:200,backgroundColor:'#FCB826',borderRadius:20}}>
            <TouchableOpacity onPress={()=>setError("")} style={{display:'flex',justifyContent:'center',alignItems:'flex-start',height:30,width:340}}>
              <Image source={IconoCruz} style={{width:20,height:20,marginLeft:10}}/>
            </TouchableOpacity>
            <View style={{display:'flex',flexDirection:'column',width:370,height:150,justifyContent:'center',alignItems:'center'}}>
            <Image source={IconoContrasenia} style={{width:40,height:40}}/>
              <Text style={{fontSize:20,color:'black'}}>Ups!</Text>
              <Text style={{fontSize:16,color:'black'}}>{error}</Text>
            </View>
          </View>
        </Modal>  

      </View>
    }/>
  )
}

const styles = StyleSheet.create(estilos);
