import React from "react";
import {View, StyleSheet,Image} from "react-native";
import menuHamburguesaIcono from "../assets/menuHamburguesaIcono.png";
import MorfAr from "../assets/MorfAR.png";
import LogoSol from "../assets/Logo_Sol_Chico.png";
import estiloApp from "../estilos/estiloApp";

type PantallaTipoHomeProps ={
    contenido: JSX.Element;
}

const PantallaTipoHome=(props:PantallaTipoHomeProps) =>{
    return(
    <View>
        <View style={style.bgHeaderPrincipal}>
            <View style={style.flexRow}>
                <Image source={menuHamburguesaIcono}/>
                <Image source={MorfAr} style={style.morfar}/>
                <Image source={LogoSol}/>
            </View>
        </View>
        <View style={style.bgPrincipal}> 
            {props.contenido}
        </View>
    </View>
    )
}

const style=StyleSheet.create(estiloApp);

export default PantallaTipoHome;