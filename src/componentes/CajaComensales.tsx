import { Image, StyleSheet, Text, View } from "react-native";
import fotoComensales from "../assets/comensales.png";
import { TouchableOpacity } from "react-native-gesture-handler";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import estiloApp from "../estilos/estiloApp";

type CajaComensalesProps ={
    cantidadComensales:number,
    onChange(text:number): void
}

 const  CajaComensales = forwardRef((props:CajaComensalesProps,ref): JSX.Element => {

    const [val, setVal] = useState(props.cantidadComensales);

    // Usamos una referencia para mantener el valor original del ingrediente
    const valorOriginal = useRef(props.cantidadComensales);
    
    useImperativeHandle(ref, () => ({
        actualizarValor: (proporcion:number) => {
            // Usamos el valor original para calcular el nuevo valor
            setVal(parseInt((valorOriginal.current * proporcion).toFixed(0)));
        }
    }));
    return(
            <View style={[styles.flexRow,{borderWidth:2,borderRadius:45,justifyContent:"space-around", width: "50%", alignSelf:'center',marginBottom:20,marginTop:5}]}>
                <View style={{width:"10%", marginLeft:-15}}>
                    <Image source={fotoComensales}/>
                </View>
                <View style={{display:"flex",marginLeft:20,justifyContent:"center", }}>
                    <TouchableOpacity onPress={() => {if(val>=2){props.onChange(val-1);setVal(val-1);}else{null}}}><Text style={{fontSize: 25, fontWeight: 'bold'}}>-</Text></TouchableOpacity>
                </View>
                <View>
                    <Text>{!Number.isNaN(val)?val:1}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => {props.onChange(val+1);setVal(val+1);}}><Text style={{fontSize: 25, fontWeight: 'bold'}}>+</Text></TouchableOpacity>
                </View>
                
            </View>
        )
});

const styles=StyleSheet.create(estiloApp);

export default CajaComensales;