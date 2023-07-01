import { StyleSheet, Text, TextInput, View } from "react-native";
import { Utilizado } from "../App";
import estiloApp from "../estilos/estiloApp";
import { Ref, forwardRef, useImperativeHandle, useRef, useState } from "react";

type CajaIngredientesRecetasProps ={
    utilizado:Utilizado,
    onChange(text:string): void,
    valorFijo: number,
    comensalesRef: React.Ref<unknown>
}

const CajaIngredientesRecetas= forwardRef((props:CajaIngredientesRecetasProps, ref) : JSX.Element=>{
    const [val, setVal] = useState(props.utilizado.cantidad.toString());

    // Usamos una referencia para mantener el valor original del ingrediente
    const valorOriginal = useRef(props.utilizado.cantidad);
    
    useImperativeHandle(ref, () => ({
        actualizarValor: (proporcion:number) => {
            // Usamos el valor original para calcular el nuevo valor
            setVal((valorOriginal.current * proporcion).toFixed(0));
        }
    }));
    return(
            <View style={{display:"flex",flexDirection: "row",alignItems: "center",justifyContent: "space-around",borderRadius:40,borderColor:"black",height:60, borderWidth: 2, marginBottom:20,marginTop:5}}> 
                <Text style={{fontWeight:'bold',fontSize:20,color:'black'}}>{props.utilizado.idIngrediente.nombre}</Text>
                <TextInput 
                    keyboardType='numeric'
                    onChangeText={(text)=> {props.onChange(text);setVal(text)}}
                    value={val}
                    maxLength={10}
                    style={{fontWeight:'bold',fontSize:20,borderLeftColor:'black',borderRightColor:'black',borderWidth:1,width:70 ,height:60,textAlign:'center'}}
                />
                <Text style={{fontWeight:'bold',fontSize:20}}>{props?.utilizado?.unidad?.descripcion}</Text>
            </View> 
        )
});

const styles=StyleSheet.create(estiloApp);

export default CajaIngredientesRecetas;