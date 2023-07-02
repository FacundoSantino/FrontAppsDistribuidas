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
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import LogoSol from "../../assets/Logo_Sol_Bueno.png";
import PantallaTipoLogin from '../../componentes/PantallaTipoLogin';
import { TipoParametros } from '../../App';
import Modal from "react-native-modal";
import IconoCruz from '../../assets/cruz.png';
import Lupa from '../../assets/lupa.png';
interface LoginInicialProps {
  funcionDireccion: (direccion : string) => void;
}
type ContraProps = RouteProp<TipoParametros,'Codigo'>;

export default function LoginInicial({ funcionDireccion }: LoginInicialProps) {
  const navigation = useNavigation();
  const route = useRoute<ContraProps>();
  const [checked, setChecked] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [num,setNumero]=useState<number>();
  const [modal,setModal] = useState(false);
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
  const manejarChequeo = () => {
    if(num==route.params.codigo){
      navigation.navigate("RestablecerContrasenia" as never, {user: route.params.user} as never)
    }
    else{
      setModal(true);
      console.log("El codigo esta mal");
    }
  }
  const CustomButton = ({ onPress, title, color }: { onPress: () => void; title: string; color: string }) => (
    <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: color }]}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
  return (
    <PantallaTipoLogin contenido={
    <View style={styles.loginBox}>

        <Text style={styles.ingreseUsuarioTitulo}> INGRESE CODIGO DE VERIFICACION ENVIADO A SU MAIL </Text>
        <View style={styles.inputTextLogin}>
            <Image source={IconoUsuario} style={styles.iconoLogin} />
        <TextInput keyboardType="numeric" maxLength={6} onChangeText={(e) => setNumero(parseInt(e))} placeholder="Ingrese su codigo" style={styles.contentInput}></TextInput>
        </View>
            <View style={styles.buttonViewContainer}>
                <CustomButton
                title="Verificar"
                color="#D69D20"
                onPress={()=> {manejarChequeo()}}
            />
        </View>
        <Modal isVisible = {modal}>
          <View style={{display:'flex',flexDirection:'column',width:370,height:200,backgroundColor:'#FCB826',borderRadius:20}}>
            <TouchableOpacity onPress={()=>setModal(false)} style={{display:'flex',justifyContent:'center',alignItems:'flex-start',height:30,width:340}}>
              <Image source={IconoCruz} style={{width:20,height:20,marginLeft:10}}/>
            </TouchableOpacity>
            <View style={{display:'flex',flexDirection:'column',width:370,height:150,justifyContent:'center',alignItems:'center'}}>
            <Image source={IconoCruz} style={{width:50,height:50}}/>
              <Text style={{fontSize:20,color:'black'}}>Ups!</Text>
              <Text style={{fontSize:16,color:'black'}}>El codigo ingresado es incorrecto, por favor intentelo nuevamente.</Text>
            </View>
          </View>
        </Modal>

    </View>
    }/>
  )
}

const styles = StyleSheet.create(estilos);
