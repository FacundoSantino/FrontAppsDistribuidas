import { StyleSheet, Text, View } from "react-native";
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

    React.useEffect( () =>{
        setCargoPantalla(false);
        ingredientesFetch().then((data) => setComentarios(data)).then(() => {
            if(typeof route.params.idReceta != 'undefined'){
                setP(comentarios.map( (item:any, i:number) => (
                    <CajaComentarios valoracion={item.valoracion} comentario={item.comentario} usuario={item.usuario}/>
                )
                ))
        };
            console.log(p);
            console.log(route.params.idReceta);
            }).finally(() => {setCargoPantalla(true);});
    },[]
    )
    
    if(cargoPantalla){
        return(
            <PantallaTipoHome contenido={
                <View>
                    <Text style={{fontWeight:"bold"}}> Comentarios</Text>
                    <ScrollView>
                        {p}
                    </ScrollView>
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