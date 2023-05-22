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

interface LoginInicialProps {
  funcionDireccion: (direccion : string) => void;
}
export default function LoginInicial({ funcionDireccion }: LoginInicialProps) {
  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);
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
  const CustomButton = ({ onPress, title, color }: { onPress: () => void; title: string; color: string }) => (
    <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: color }]}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
  return (
      <View style={styles.container}>
        <View style={styles.inputTextLogin}>
          <Image source={IconoUsuario} style={styles.iconoLogin} />
          <TextInput placeholder="Ingrese su usuario" style={styles.contentInput}></TextInput>
        </View>
        <View style={styles.inputTextLogin}>
          <Image source={IconoContrasenia} style={styles.iconoLogin} />
          <TextInput placeholder="Ingrese su contraseña" secureTextEntry={true} style={styles.contentInput}></TextInput>
        </View>
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
            onPress={() => {
              navigation.navigate("Home" as never);
            }}
          />
        </View>
        
        <Text style={styles.recuperarPass} onPress={() =>(navigation.navigate("IngresarUsuarioRestablecer" as never))}>Restablecer contraseña</Text>
        <Text style={styles.registrarme} onPress={() => (navigation.navigate("Registrar" as never))}>REGISTRARME</Text>
      </View>
  )
}

const styles = StyleSheet.create(estilos);
