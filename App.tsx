/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useRef, useState } from 'react';
import { CheckBox, Icon } from 'react-native-elements';
import type {PropsWithChildren} from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import fotoCheck from './assets/checkbox.png';
import fotoUnchecked from './assets/unchecked.png';
import { Animated } from 'react-native';
type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [checked,setChecked] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const handleCheck = () => {
    setChecked(!checked);

    Animated.timing(animatedValue, {
      toValue: checked ? 0 : 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };
  const checkedIcon = (
    <Icon name='check-square-o' size={20} color='#517fa4' />
  );

  const uncheckedIcon = (
    <Icon name='square-o' size={20} color='#517fa4' />
  );

  const interpolateColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#517fa4', '#00aced'],
  });

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
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
  const CustomButton = ({ onPress, title, color }) => (
    <TouchableOpacity onPress={onPress} style={[styles.button, {backgroundColor: color}]}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    
    <View style = {styles.container}>
      
      <View style = {styles.bgHeaderPrincipal}>
      
        <View style = {styles.bgPrincipal}>
        <Image source={{uri: 'https://res.cloudinary.com/dxpa2hk8o/image/upload/v1682340971/Logo_Sol_Bueno_zpdd75.png'}}
          style = {styles.imagen}/>
          
          <View style = {styles.loginBox}>
              <View style= {styles.inputTextLogin}>
                <Image source={{uri: 'https://res.cloudinary.com/dxpa2hk8o/image/upload/v1682343421/usuario_1_shweri.png'}}
                  style = {styles.iconoLogin}/>
                <TextInput placeholder="Ingrese su usuario" style={styles.contentInput}>
              
                </TextInput>
              </View>
              <View style= {styles.inputTextLogin}>
                <Image source={{uri: 'https://res.cloudinary.com/dxpa2hk8o/image/upload/v1682343421/restablecer-la-contrasena_1_qyiamh.png'}}
                  style = {styles.iconoLogin}/>
                <TextInput placeholder="Ingrese su contraseña" secureTextEntry={true} style = {styles.contentInput}>
              
                </TextInput>

                  
                
              </View>
              <View style = {styles.containerCheckBox}>
                <CheckBox
                    containerStyle={{ borderWidth: 0,
                    backgroundColor:'white'  }}
                    center
                    title='Recordarme'
                    checkedIcon={
                      <Animated.View style={animatedIconStyle}><Image style={styles.iconoCheckBox} source={fotoCheck} /></Animated.View>
                    }
                    uncheckedIcon={<Image style={styles.iconoCheckBox} source={fotoUnchecked}/>}
                    checked={checked}
                    onPress={()=> {setChecked(!checked)}}
                  />
              </View>

              <View style={styles.buttonViewContainer}>
              
                <CustomButton
                  title="Iniciar sesión"
                  color="#D69D20"
                  onPress={() => {
                    console.log('Botón presionado');
                  }}
                />
                
              </View>
              
              <Text style={styles.recuperarPass}> Reestablecer contraseña </Text>
              
              <Text style={styles.registrarme}> REGISTRARME </Text>
              
              
              
              
          </View>

        </View>
      </View>

    </View>

    //F0AF23 color arriba ⊙.☉
    //D69D20 color botones
    //https://res.cloudinary.com/dxpa2hk8o/image/upload/v1682340971/Logo_Sol_Bueno_zpdd75.png
    
  );
}

const styles = StyleSheet.create({
  recuperarPass:{
    alignSelf: 'center',
    top: 200,
  },
  registrarme:{
   
    top: '160%',
    alignSelf: 'center',
    color: 'black',
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Sombra negra con una opacidad del 75%
    textShadowOffset: { width: 5, height: 5 }, // Desplazamiento de la sombra: 1 píxel a la derecha y 1 píxel hacia abajo
  },
  
  button: {
    padding: 10,
    borderRadius: 25, // Aquí aplicamos el borderRadius
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  buttonLoginStyle:{
    backgroundColor: '#D69D20'
  },
  buttonViewContainer:{
    
    alignSelf: 'center',
    top: 180,
    width:180,
  },
  containerCheckBox:{
    position:'absolute',
    left: 180,
    top: 230,
    width:180
  },
  iconoCheckBox:{
    width:30,
    height:30
  },

  loginCheckBox:{
    borderRadius:45,
    height: 20,
    width:50,
    backgroungColor:'red'
  },
  loginBox: {
    
  },
  contentInput: {
    paddingLeft:30,
  },
  imagen: {
    position: 'absolute',
    alignSelf: 'center',
    top:-100,
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  iconoLogin: {
    position: 'absolute',
    top:7,
    left:10,
    zIndex: 0,
    width: 28,
    height: 28,
  },
  container: {
    flex: 1,
    borderRadius: 0,
    overflow: 'hidden',
  },
  bgHeaderPrincipal:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F0AF23',
    height: 200,
  },
  bgPrincipal: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 30,
    height: 1000,
    top: 180,
    left: 0,
    right: 0,
  },
  inputTextLogin: {
    position: 'relative',
    borderRadius: 45,
    marginBottom: 30,
    paddingLeft: 20,
    top: 120,
    height: 40,
    width: 250,
    alignSelf: 'center',
    backgroundColor: '#D9D9D9'
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
