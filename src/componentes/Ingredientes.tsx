import { RouteProp, useRoute } from "@react-navigation/native";
import { TipoParametros, Utilizado, localip } from "../App";
import { ScrollView, Text, View } from "react-native";
import PantallaTipoHome from "./PantallaTipoHome";
import { MutableRefObject, useRef, useState } from "react";
import React from "react";
import CajaIngredientesRecetas from "./CajaIngredienteRecetas";
import CajaComensales from "./CajaComensales";
import { TouchableOpacity } from "react-native-gesture-handler";


type IngredientesProps= RouteProp<TipoParametros, "Ingredientes">;


export default function Ingredientes() :JSX.Element {
    const route=useRoute<IngredientesProps>();
    const[cargoPantalla,setCargoPantalla]=useState(false);
    const [coleccionIngredientes,setColeccionIngredientes]=useState<Element[]>([]);
    const[loaded,setLoaded]=useState(false);
    const [data,setData]=useState<Utilizado[]>([]);
    let coleccion: { key: number, itemData: Utilizado; }[] = [];
    const urlFetchUtilizados="http://"+localip+":8080/api/rest/morfar/utilizadosReceta/";
    const listaReferencias : MutableRefObject<any>[]=[];
    const [items,setItems] = useState<any>([]);
    
    if(!loaded){
        fetch(urlFetchUtilizados+route.params.idReceta)
        .then((r)=>r.json())
        .then((d)=> {
            data.map((item: Utilizado, i: number) => (
                coleccion.push({ key: i, itemData: item })
            ))
            
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
        .then(() => {
            
            let lista=coleccion.map(item => (
                <CajaIngredientesRecetas
                    utilizado={item.itemData}
                    key={item.key}
                    onChange={(texto: string) => { 
                        const cantidad = Number.parseFloat(texto);
                        if (!isNaN(cantidad)) {
                            const factor = cantidad / item.itemData.cantidad;
                            actualizarCantidades(factor, item.key);
                        }
                    }}
                    
                />
            ));

            
            setColeccionIngredientes(lista);
        })
        .finally(()=> setLoaded(true)); 
        
        
    }

    
    function actualizarCantidades(proporcion: number,key:number) {
        
        setLoaded(false);
        console.log("ANTES-------------------------");
        console.log(coleccion);
        const indice = coleccion.findIndex(item=> item.key === key);
        coleccion.forEach(item=>{
            if (item.key != indice){
                item.itemData.cantidad = item.itemData.cantidad*proporcion;
            }
        }
        
        );

        let lista=coleccion.map(item => (
            <CajaIngredientesRecetas
                utilizado={item.itemData}
                key={item.key}
                onChange={(texto: string) => { 
                    const cantidad = Number.parseFloat(texto);
                    if (!isNaN(cantidad)) {
                        const factor = cantidad / item.itemData.cantidad;
                        actualizarCantidades(factor, item.key);
                    }
                }}
                
            />
        ));

        
        setColeccionIngredientes(lista);

        console.log("DESPUES-------------------------");
        console.log(coleccionIngredientes);

        setLoaded(true);
    }

    if(loaded){

        return(
            <PantallaTipoHome contenido={
                
                <View>
                    <Text style={{textAlign:'center',fontWeight:'bold',fontSize:30}}> {route.params.nombreReceta} </Text>
                    <Text style={{textAlign:'center',color:'black',fontSize:15}} > Ingredientes </Text>
                    <CajaComensales
                    cantidadComensales={1}
                    onChange={(text:number) => {console.log("hola")}}                
                    
                    />
                    <ScrollView>  
                    {(coleccionIngredientes.length > 0) ? 
                        null : null}
                    </ScrollView>
                    <View style={{backgroundColor:'white',width:'100%', position:'absolute', height:5, bottom:0,alignSelf:'center',zIndex:80}}>
                        <TouchableOpacity style={{marginTop:6,display:"flex", backgroundColor:'#F0AF23',height:'100%',width:335,minHeight:50,alignSelf:"center", justifyContent:'center', borderRadius: 20}}>
                            <Text style={{alignSelf:"center",fontSize:20,borderRadius:25, justifyContent:"center"}}>AGREGAR A MI LISTA</Text>
                        </TouchableOpacity>
                </View>
                </View>
                
            }/>   
        )
    }
    else{
        return(<Text>Cargando...</Text>)
    }

}