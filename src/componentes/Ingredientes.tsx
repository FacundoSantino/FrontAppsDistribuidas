import { RouteProp, useRoute } from "@react-navigation/native";
import { TipoParametros, Utilizado, localip } from "../App";
import { ScrollView, Text, View } from "react-native";
import PantallaTipoHome from "./PantallaTipoHome";
import { useState } from "react";
import React from "react";
import CajaIngredientesRecetas from "./CajaIngredienteRecetas";


type IngredientesProps= RouteProp<TipoParametros, "Ingredientes">;


export default function Ingredientes() :JSX.Element {
    const route=useRoute<IngredientesProps>();
    const[cargoPantalla,setCargoPantalla]=useState(false);
    const[loaded,setLoaded]=useState(false);
    const [data,setData]=useState<Utilizado[]>([]);

    const urlFetchUtilizados="http://"+localip+":8080/api/rest/morfar/utilizadosReceta/";

    const fetchUtilizados= async () => {
        try{
            const respuesta= await fetch(urlFetchUtilizados+route.params.idReceta);
            const data = await respuesta.json();
            return data;
        }
        catch(err){
            console.log(err);
        }
    
    }
    React.useEffect(() => {
        setLoaded(false);
        fetch(urlFetchUtilizados+route.params.idReceta)
        .then((r)=>r.json())
        .then((d)=> {
            const contenidoMapeado: Utilizado[] =[];
            d.forEach(
                (item:any,i:number) => {
                    contenidoMapeado.push(
                        {
                        "idUtilizado": item.idUtilizado,
                            "receta": item.idReceta,
                            "idIngrediente": item.idIngrediente,
                            "cantidad": item.cantidad,
                            "unidad": item.idUnidad,
                            "observaciones": item.observaciones
                        }                          
                    )
                    }
            );
            setData(contenidoMapeado);
        })
        .finally(()=> setLoaded(true)); 
        },[]);

    if(loaded){
        return(
            <PantallaTipoHome contenido={
                <View>
                    <Text style={{textAlign:'center',fontWeight:'bold',fontSize:30}}> {route.params.nombreReceta} </Text>
                    <Text style={{textAlign:'center',color:'black',fontSize:15}}> Ingredientes </Text>
                    <ScrollView>
                        {(loaded) ? data.map((item: Utilizado, i: number) => (
                            <CajaIngredientesRecetas
                                utilizado={item}
                                key={i}
                                onChange={(texto: string) => { 
                                    console.log("Ahora hay " + texto + item.unidad + " de " + item.idIngrediente.nombre);
                                }}
                            />
                        )) : null}

                    </ScrollView>

                </View>
            }/>   
        )
    }
    else{
        return(<Text>Cargando...</Text>)
    }

}