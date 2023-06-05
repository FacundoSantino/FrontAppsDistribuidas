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

interface LoginInicialProps {
  funcionDireccion: (direccion : string) => void;
}
export default function LoginInicial({ funcionDireccion }: LoginInicialProps) {
  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [user, setUser] = useState("");
  const [error,setError] = useState("");
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
          navigation.navigate("Codigo" as never);
        } else {
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
        <Text>{error}</Text>
            <View style={styles.buttonViewContainer}>
                <CustomButton
                title="Verificar"
                color="#D69D20"
                onPress={()=> {handleVerifyUser()}}
            />
        </View>

    </View>
    }
    />
  )
}

const styles = StyleSheet.create(estilos);
