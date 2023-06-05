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

interface LoginInicialProps {
  funcionDireccion: (direccion : string) => void;
}
export default function LoginInicial({ funcionDireccion }: LoginInicialProps) {
  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);
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
  const fetchReset = async()=>{
    const respuesta = fetch("http://"+localip+":8080/api/rest/morfar/restorePass",
    {     
      method: 'POST',
      body: JSON.stringify({"idUser" : 1,
      "password1" : password,
      "password2" : repassword}),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    )
  }
  const handleReset = ()=>{
    navigation.navigate("Login" as never);
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
        <View style={styles.inputTextLogin}>
          <Image source={IconoUsuario} style={styles.iconoLogin} />
          <TextInput value={password} onChange={(e)=>setPassword(e.nativeEvent.text)} placeholder="Ingresar contraseña" style={styles.contentInput}></TextInput>
        </View>
        <View style={styles.inputTextLogin}>
          <Image source={IconoContrasenia} style={styles.iconoLogin} />
          <TextInput value = {repassword} onChange={(e)=>setRepassword(e.nativeEvent.text)} placeholder="Ingresar contraseña" secureTextEntry={true} style={styles.contentInput}></TextInput>
        </View>
        <View style={styles.buttonViewContainer}>
          <CustomButton
            title="RESTABLECER"
            color="#D69D20"
            onPress={() => {handleReset()}}
          />
        </View>
      </View>
    }/>
  )
}

const styles = StyleSheet.create(estilos);
