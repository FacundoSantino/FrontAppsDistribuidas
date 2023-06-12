import { StyleSheet, Text, TextInput, View } from "react-native";
import { Utilizado } from "../App";
import estiloApp from "../estilos/estiloApp";
import { useState } from "react";

type CajaIngredientesRecetasProps ={
    utilizado:Utilizado,
    onChange(text:string): void
}

const CajaIngredientesRecetas= (props:CajaIngredientesRecetasProps) : JSX.Element=>{
    const [val, setVal] = useState(props.utilizado.cantidad.toString());

    
    function actualizarValor(proporcion:number){
        setVal((Number.parseFloat(val)*proporcion).toString());
    }

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
                <Text style={{fontWeight:'bold',fontSize:20}}>{props.utilizado.unidad.descripcion}</Text>
            </View> 
        )
}

const styles=StyleSheet.create(estiloApp);

export default CajaIngredientesRecetas;