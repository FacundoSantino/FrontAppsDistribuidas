import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import estiloApp from "../estilos/estiloApp";
import PantallaTipoHome from "../componentes/PantallaTipoHome";
import { ScrollView } from "react-native-gesture-handler";
import React, { useState } from "react";
import CajaComentarios from "../componentes/CajaComentarios";
import { TipoParametros, localip } from "../App";
import { RouteProp, useRoute } from "@react-navigation/native";

type ComentariosProps= RouteProp<TipoParametros, "Comentarios">;

export default function Comentarios(){
    const [p,setP]=useState<any[]>([]);
    const [cargoPantalla,setCargoPantalla]=useState(false);
    const route=useRoute<ComentariosProps>();
    const [procesado, setProcesado] = useState<String[]>([]);

    const [comentarios,setComentarios]=useState([]);

    const urlFetchComentarios="http://"+localip+":8080/api/rest/morfar/commentsByRecipe/"

    const ingredientesFetch= async () => {
        try{
            const respuesta= await fetch(urlFetchComentarios+route.params.idReceta);
            const data = await respuesta.json();
            return data;
        }
        catch(err){
            console.log(err);
        }
    
    }

    if(!cargoPantalla){
        ingredientesFetch().then((data) => setComentarios(data)).then(() => {
            if(typeof route.params.idReceta != 'undefined'){
                setP(comentarios);
        };
            console.log(p);
            console.log(route.params.idReceta);
            }).finally(() => {setCargoPantalla(true);});
    }
    
    // comentarios 24 bold centrado
    if(cargoPantalla){
        return(
            <PantallaTipoHome contenido={
                <View style={{display:"flex"}}>
                    <Text style={{fontWeight:"bold",fontSize:24,alignSelf:"center",marginBottom:10,color:"black"}}> Comentarios</Text>
                    <ScrollView style={{minHeight:640}}>
                        {p.map( (item:any, i:number) => (
                    <CajaComentarios valoracion={item.valoracion} comentario={item.comentario} usuario={item.usuario} key={i}/>
                        )
                    )}
                    </ScrollView>

                    <TouchableOpacity style={{display:"flex",backgroundColor:"#FCB826",borderRadius:45, width:200,marginVertical:10,paddingVertical:5,alignSelf:"center",justifyContent:"center",height:41}}>
                        <Text style={{alignSelf:"center", justifyContent:"center",fontSize:16,color:"black",fontWeight:"bold"}}>
                            AGREGAR COMENTARIO
                        </Text>
                    </TouchableOpacity>
                </View>
            }
            />
        )
    }
    else{
        return(<View></View>)
    }
    
}

const styles=StyleSheet.create(estiloApp);