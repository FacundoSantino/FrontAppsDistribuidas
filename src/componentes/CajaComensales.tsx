import { Image, StyleSheet, Text, View } from "react-native";
import fotoComensales from "../assets/comensales.png";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import estiloApp from "../estilos/estiloApp";

type CajaComensalesProps ={
    cantidadComensales:number,
    onChange(text:number): void
}

export default function CajaComensales(props:CajaComensalesProps): JSX.Element{

    const [val, setVal] = useState(props.cantidadComensales);
    const [valAnterior,setValAnterior]=useState(props.cantidadComensales);
    
    return(
            <View style={[styles.flexRow,{borderWidth:1,borderRadius:45,justifyContent:"space-around", width: "50%", alignSelf:'center',marginBottom:20,marginTop:5}]}>
                <View style={{width:"10%", marginLeft:-15}}>
                    <Image source={fotoComensales}/>
                </View>
                <View style={{display:"flex",marginLeft:20,justifyContent:"center", }}>
                    <TouchableOpacity onPress={() => {val>=2?setVal(val-1):null;props.onChange(val);}}><Text style={{fontSize: 25, fontWeight: 'bold'}}>-</Text></TouchableOpacity>
                </View>
                <View>
                    <Text>{!Number.isNaN(val)?val:1}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => {setVal(val+1);props.onChange(val);}}><Text style={{fontSize: 25, fontWeight: 'bold'}}>+</Text></TouchableOpacity>
                </View>
                
            </View>
        )
}

const styles=StyleSheet.create(estiloApp);