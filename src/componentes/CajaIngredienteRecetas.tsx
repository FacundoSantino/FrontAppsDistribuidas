import { StyleSheet, Text, TextInput, View } from "react-native";
import { Utilizado } from "../App";
import estiloApp from "../estilos/estiloApp";
import { useState } from "react";

type CajaIngredientesRecetasProps ={
    utilizado:Utilizado,
    onChange(text:string): void
}

const CajaIngredientesRecetas= (props:CajaIngredientesRecetasProps) =>{
    const [val, setVal] = useState(props.utilizado.cantidad.toString());

    return(
            <View style={styles.flexRow}> 
                <Text>{props.utilizado.idIngrediente.nombre}</Text>
                <TextInput 
                    keyboardType='numeric'
                    onChangeText={(text)=> {props.onChange(text);setVal(text)}}
                    value={val}
                    maxLength={10}
                />
                <Text>{props.utilizado.unidad.descripcion}</Text>
            </View>
        )
}

const styles=StyleSheet.create(estiloApp);

export default CajaIngredientesRecetas;