import { RouteProp, useRoute } from "@react-navigation/native";
import { TipoParametros, Utilizado, localip } from "../App";
import { ScrollView, Text, View } from "react-native";
import PantallaTipoHome from "./PantallaTipoHome";
import { useState } from "react";
import React from "react";
import CajaIngredientesRecetas from "./CajaIngredienteRecetas";
import CajaComensales from "./CajaComensales";
import { TouchableOpacity } from "react-native-gesture-handler";


type IngredientesProps= RouteProp<TipoParametros, "Ingredientes">;


export default function Ingredientes() :JSX.Element {
    const route=useRoute<IngredientesProps>();
    const[cargoPantalla,setCargoPantalla]=useState(false);
    const[loaded,setLoaded]=useState(false);
    const [data,setData]=useState<Utilizado[]>([]);
    let coleccion: { key: number, itemData: Utilizado; }[] = [];
    const urlFetchUtilizados="http://"+localip+":8080/api/rest/morfar/utilizadosReceta/";
    const [referenciaScroll,setReferenciaScroll]=useState(React.createRef<ScrollView>());
    const [listaReferencias,setListaReferencias]=useState();

    function agregarRef(){
        let referencia=React.createRef();
        //hay que ver como hacer una lista de referencias y agregarlas
        return (referencia);
    }
    
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
        {(loaded) ? data.map((item: Utilizado, i: number) => (
            coleccion.push({ key: i, itemData: item })
        )) : null}
        function actualizarCantidades(proporcion: number,key:number) {
            const indiceCamb = coleccion.findIndex(item=> item.key === 4);
            const indice = coleccion.findIndex(item=> item.key === key);
            console.log(typeof coleccion[indice].itemData.cantidad);
            coleccion.forEach(item=>{
                if (item.key != indice){
                    item.itemData.cantidad = 10;
                }
            });
        }
        return(
            <PantallaTipoHome contenido={
                
                <View>
                    <Text style={{textAlign:'center',fontWeight:'bold',fontSize:30}}> {route.params.nombreReceta} </Text>
                    <Text style={{textAlign:'center',color:'black',fontSize:15}}> Ingredientes </Text>
                    <CajaComensales
                    cantidadComensales={1}
                    onChange={(text:number) => {console.log("hola")}}
                    />
                    <ScrollView ref={referenciaScroll}>  
                    {(coleccion.length > 0) ? 
                        (coleccion.map(item => (
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
                        ))) : null}
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