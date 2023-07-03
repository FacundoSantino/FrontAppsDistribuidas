import { Image, ImageSourcePropType, StyleSheet, Text, TextInput, View } from "react-native";
import { Utilizado } from "../App";
import estiloApp from "../estilos/estiloApp";
import { useState } from "react";
import estrellaLlena from '../assets/estrellaLlena.png'
import estrellaVacia from '../assets/estrellaVacia.png'

type CajaComentariosProps ={
    comentario:string,
    usuario:string,
    valoracion:number
}

export default function CajaComentarios (props:CajaComentariosProps): JSX.Element{
    var p: number[] = [1,2,3,4,5];
    const numeroEstrellasLlenas=Math.round(props.valoracion);
    const [estrellas,setEstrellas]=useState<any[]>([]);
    const [cargoEstrellas,setCargoEstrellas]=useState(false);


    function setearEstrellas():void{
        setEstrellas(p.map((i) => (
            <Image style={{height:13,width:14}} source={i<=numeroEstrellasLlenas?estrellaLlena:estrellaVacia} key={i}/>
        )))
        setCargoEstrellas(true);
    }

    if(!cargoEstrellas){
        setearEstrellas();
    }

    return(
        <View style={{display:'flex',flexDirection:'column',borderWidth: 2,marginBottom:10,borderRadius:20,paddingVertical:10}}>
            <View style={{justifyContent:'flex-start',marginLeft:10}}>
                <Text style={{fontWeight:'bold',fontSize:17,color:'black'}}> {props.usuario} </Text>
                <View style={[styles.flexRow,{justifyContent:'flex-start',marginLeft:10}]}>
                    {cargoEstrellas?estrellas:null}
                </View>
            </View>
            <Text style={{textAlign:'center'}}> {props.comentario} </Text>
        </View>
    );
}

const styles=StyleSheet.create(estiloApp);