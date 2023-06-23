import { Image, StyleSheet, Text, View } from "react-native";
import fotoPorciones from "../assets/porciones.png";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import estiloApp from "../estilos/estiloApp";

type CajaPorcionesProps ={
    cantidadPorciones:number,
    onChange(text:number): void
}

export default function CajaPorciones(props:CajaPorcionesProps): JSX.Element{

    const [val, setVal] = useState(props.cantidadPorciones);
    const [valAnterior,setValAnterior]=useState(props.cantidadPorciones);
    
    return(
            <View style={[styles.flexRow,{borderWidth:2,borderRadius:45,justifyContent:"space-around", width: "50%", alignSelf:'center',marginBottom:10,marginTop:5,height:50}]}>
                <View style={{width:"10%", marginLeft:-15}}>
                    <Image source={fotoPorciones} style={{width:35,height:35,marginVertical:2,marginLeft:7}}/>
                </View>
                <View style={{display:"flex",marginLeft:20,justifyContent:"center", }}>
                    <TouchableOpacity onPress={() => {val>=2?setVal(val-1):null;val>=2?props.onChange(val-1):null}}><Text style={{fontSize: 25, fontWeight: 'bold'}}>-</Text></TouchableOpacity>
                </View>
                <View>
                    <Text>{!Number.isNaN(val)?val:1}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => {setVal(val+1);props.onChange(val+1);}}><Text style={{fontSize: 25, fontWeight: 'bold'}}>+</Text></TouchableOpacity>
                </View>
                
            </View>
        )
}

const styles=StyleSheet.create(estiloApp);