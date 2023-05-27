import { useState } from "react";
import {Image, ImageSourcePropType, View, Text} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

type TarjetaRecetaProps={
    nombre:String,
    cantPorciones: number,
    tiempo:number,
    sourceFoto:ImageSourcePropType,
    color: Color,
    onPress():void
    ancho:number,
    alto:number
}
type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;


const TarjetaReceta = (props:TarjetaRecetaProps) =>{
    return(
        <TouchableOpacity style={{ backgroundColor:props.color, borderRadius:20,borderColor:"#000000",borderWidth:1,width:props.ancho,height:props.alto}} onPress={(props.onPress)}>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center', justifyContent:'space-around',width:props.ancho,height:props.alto}}>
                <Image source={props.sourceFoto}/>
                <View style={{display:'flex',flexDirection:'column',height:props.alto,alignItems:'center',justifyContent:'space-around'}}>
                    <Text>{props.nombre}</Text>
                     <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                        <Text>{props.cantPorciones} porciones     </Text>
                        <Text>{props.tiempo} de elaboracion</Text>
                    </View>   
                </View>
            </View>
          
        </TouchableOpacity>
    )

}
export default TarjetaReceta;