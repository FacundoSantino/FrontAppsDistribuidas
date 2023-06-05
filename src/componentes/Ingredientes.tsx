import { RouteProp, useRoute } from "@react-navigation/native";
import { TipoParametros } from "../App";
import { ScrollView, Text, View } from "react-native";
import PantallaTipoHome from "./PantallaTipoHome";
import { useState } from "react";


type IngredientesProps= RouteProp<TipoParametros, "Receta">;


export default function Ingredientes() :JSX.Element {

    const[ingredientesProcesados,setIngredientesProcesados]=useState(<View></View>);
    const[comensales,setComensales]=useState(
        <View></View>
    )

    

    const route=useRoute<IngredientesProps>();



    return(
        <PantallaTipoHome contenido={
            <View>
                <Text style={{textAlign:'center',fontWeight:'bold',fontSize:30}}> Titulo receta </Text>
                <Text style={{textAlign:'center',color:'black',fontSize:15}}> Ingredientes </Text>
                <ScrollView>
                    {comensales}
                    {ingredientesProcesados}
                </ScrollView>

            </View>
        }/>   
    )

}