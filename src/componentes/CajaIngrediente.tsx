import { useState } from "react";
import {Image, ImageSourcePropType, View, Text} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import fotoTilde from '../assets/tilde.png';
import fotoCruz from '../assets/cruz.png';
import vacio from '../assets/vacio.png';

enum Estado{
    VACIO,
    TILDE,
    CRUZ
}

type CajaIngredienteProps ={
    nombre: String;
    onPress(x:Estado): void;
    sourceFoto: ImageSourcePropType;
    colorInterno: Color;
    colorExterno: Color;
    paddingTop: number;
    paddingBottom:number;
    paddingHorizontal: number;
    ancho:number;
}

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;

const CajaIngrediente= (props:CajaIngredienteProps) =>{
    const [fotoCheck, setFotoCheck]=useState(vacio);
    const [estado,setEstado]=useState(Estado.VACIO);
    

    return(
        <TouchableOpacity 
        style={{backgroundColor:props.colorExterno,paddingTop:props.paddingTop,
            paddingBottom:props.paddingBottom,borderColor:"#000000", borderWidth:1,
            paddingHorizontal:props.paddingHorizontal, borderRadius:10, width:props.ancho,
            marginTop:17,marginLeft:25,
            }} 
            onPress={()=>{
                if( estado == Estado.VACIO){
                    setEstado(Estado.TILDE);
                    setFotoCheck(fotoTilde);
                }
                else if( estado == Estado.TILDE) {
                    setEstado(Estado.CRUZ);
                    setFotoCheck(fotoCruz);
                }
                else if( estado == Estado.CRUZ){
                    setEstado(Estado.VACIO);
                    setFotoCheck(vacio);
                }
                props.onPress(estado);}
            }>

            <View style={{backgroundColor:props.colorInterno,        
                display:"flex",
                flexDirection: "row",
                alignItems:'center',
                borderRadius:10,
                height:60,
                justifyContent:"space-around"
                }}>
                
                <Image source={props.sourceFoto} style={{justifyContent:"flex-start"}} />

                <Text style={{fontSize:24}}> {props.nombre} </Text>
                
                <Image source={fotoCheck} style={{width:48,height:48,marginLeft:10}}/>

            </View>
            
        </TouchableOpacity>
    )

}

export default CajaIngrediente;