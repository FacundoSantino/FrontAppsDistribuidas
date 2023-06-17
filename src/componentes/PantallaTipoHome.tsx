import React, { useState } from "react";
import {View, StyleSheet,Image, TouchableOpacity, Text} from "react-native";
import menuHamburguesaIcono from "../assets/menuHamburguesaIcono.png";
import MorfAr from "../assets/MorfAR.png";
import LogoSol from "../assets/Logo_Sol_Chico.png";
import estiloApp from "../estilos/estiloApp";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import volver from "../assets/turn-back.png";
type PantallaTipoHomeProps ={
    contenido: JSX.Element;
}

const PantallaTipoHome=(props:PantallaTipoHomeProps) =>{
    const [levantado, setLevantado] = useState(false);
    const navigation = useNavigation();
    return(
    <View>
        <View style={style.bgHeaderPrincipal}>
            <View style={style.flexRow}>
                <TouchableOpacity onPress={()=>setLevantado(!levantado)}>
                    <Image source={menuHamburguesaIcono}/>
                </TouchableOpacity>
                <Image source={MorfAr} style={style.morfar}/>
                <Image source={LogoSol}/>
            </View>
        </View>
        <View style={style.bgPrincipal}> 
            {props.contenido}
        </View>
        <Modal isVisible={levantado}>
            <View style={{backgroundColor:'#FCB826', width: '100%',height:500,borderRadius:15}}>
                <TouchableOpacity style={{backgroundColor:'white', width:'90%', height: 50,alignSelf:'center',borderRadius:15,marginTop:30}}
                onPress={()=>{
                    setLevantado(!levantado);
                    navigation.navigate('Home' as never);
                }}
                >
                    <Image source={volver} style={{width:30, height:30, marginLeft:30, marginTop:10}}></Image>
                    <Text style={{alignSelf:'center', position:'absolute', top:16}}>VOLVER A LA HOME</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={()=>setLevantado(!levantado)} style={[{alignSelf:'center',position:'absolute',bottom:50}]} >
                    <Text style={[{alignSelf:'center',backgroundColor:'white'},{borderRadius:16, padding:10}]}>Cerrar menú</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    </View>
    )
}

const style=StyleSheet.create(estiloApp);

export default PantallaTipoHome;