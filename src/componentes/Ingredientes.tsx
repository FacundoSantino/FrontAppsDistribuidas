import { RouteProp, useRoute } from "@react-navigation/native";
import { TipoParametros, Utilizado, localip } from "../App";
import { ScrollView, Text, View } from "react-native";
import PantallaTipoHome from "./PantallaTipoHome";
import { MutableRefObject, useRef, useState } from "react";
import React from "react";
import CajaIngredientesRecetas from "./CajaIngredienteRecetas";
import CajaComensales from "./CajaComensales";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage, { useAsyncStorage } from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";

type IngredientesProps= RouteProp<TipoParametros, "Ingredientes">;


export default function Ingredientes() :JSX.Element {
    const route=useRoute<IngredientesProps>();
    const addip = "http://"+localip +":8080/api/rest/morfar/getRecipe/"+route.params.idReceta;
    const addpaso = "http://"+localip +":8080/api/rest/morfar/getPasos/"+route.params.idReceta;
    const [r,setR]=useState({});
    const [modalError, setModalError] = useState(false);
    const [coleccionIngredientes,setColeccionIngredientes]=useState<Element[]>([]);
    const[loaded,setLoaded]=useState(false);
    const [data,setData]=useState<Utilizado[]>([]);
    let coleccion: { key: number, itemData: Utilizado, cantidadOriginal: number }[] = [];
    const urlFetchUtilizados="http://"+localip+":8080/api/rest/morfar/utilizadosReceta/";
    const ingredientRefs = useRef<(MutableRefObject<{ actualizarValor: (proporcion: number) => void }> | null)[]>([]);
    const comensalRef= useRef<(MutableRefObject<{actualizarValor:(proporcion:number) => void}> |null )>();
    let comensales = 1;
    const agregarAsync= async () => {

        const recetasModificadasAux=await useAsyncStorage("recetasModificadas").getItem();
        //2 casos posibles
        //1. ya existe en modificadas la receta
        //2. no existe
        // si 1. pregunto si agregar o reemplazar, independientemente del espacio y si no hay espacio, pregunto si reemplazar y cual
        //si 2 pregunto si agregar si es que no hay espacio

        data.forEach(item => {
            console.log(item.cantidad+" de "+item.idIngrediente.nombre);
        })

        if(recetasModificadasAux!=null){
            const recetasModificadas=await JSON.parse(await recetasModificadasAux);
            if(recetasModificadas.length<10){
                //hay lugar
                const respPasos = await fetch(addpaso);
                const pasos = await respPasos.json();
                const respuesta = await fetch(addip);
                const receta = await respuesta.json();
                const recetaIngredientesPasos = {
                    receta: receta,
                    ingredientes: route.params.ingredientes,
                    pasos: pasos
                }
                recetasModificadas.push(receta);
                const listaSerializada = JSON.stringify(recetasModificadas);
                await AsyncStorage.setItem("recetasModificadas", listaSerializada);   
            }
            else{
                //no hay lugar
                setModalError(true);
                setTimeout(()=>setModalError(false),4000);

            }

        }
        else{
            //hago lista vacia y agrego receta
            const respPasos = await fetch(addpaso);
            const pasos = await respPasos.json();
            const respuesta = await fetch(addip);
            const receta = await respuesta.json();
            const lista = [];
            const recetaIngredientesPasos = {
                receta: receta,
                ingredientes: route.params.ingredientes,
                pasos: pasos
            }
            lista.push(receta);
            const listaSerializada = JSON.stringify(lista);
            await AsyncStorage.setItem("recetasModificadas", listaSerializada);        

        }
            
    }



    if(!loaded){
        fetch(urlFetchUtilizados+route.params.idReceta)
        .then((r)=>r.json())
        .then((d)=> {
            data.map((item: Utilizado, i: number) => (
                coleccion.push({
                    key: i, itemData: item,
                    cantidadOriginal: item.cantidad
                })
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
                            "observaciones": item.observaciones,
                            "valorFijo" : item.cantidad
                        }                          
                    )
                    }
            );
            
            setData(contenidoMapeado);
        })
        .then(() => {
            let lista = coleccion.map((item, index) => {
                // Crear una nueva referencia para este ingrediente
                ingredientRefs.current[index] = {current: { actualizarValor: () => {} }};
        
                return (
                    <CajaIngredientesRecetas
                        ref={ingredientRefs.current[index]}
                        comensalesRef = {comensalRef}
                        utilizado={item.itemData}
                        valorFijo={item.itemData.cantidad}
                        key={item.key}
                        onChange={(texto: string) => { 
                            const cantidad = Number.parseFloat(texto);
                            if (!isNaN(cantidad)) {
                                const factor = cantidad/item.itemData.valorFijo;
                                console.log("Factor: "+factor);
                                actualizarCantidades(factor, item.key);
                                
                            }
                        }}
                    />
                );
            });
        
            setColeccionIngredientes(lista);
        })
        .finally(()=> setLoaded(true)); 
        
        
    }

    
    function actualizarCantidades(proporcion: number, key:number) {
        const indice = coleccion.findIndex(item => item.key === key);
        console.log("INDICE "+indice);
        if(indice==-1){
            console.log("Tamaño coleccion "+coleccionIngredientes.length);
            coleccion.forEach((item, index) => {
                if (item.key != indice){
                    console.log("INGREDIENTE: "+item.itemData.idIngrediente.nombre);
                    console.log("Cantidad original: " +item.cantidadOriginal);
                    console.log("Proporcion: "+proporcion)
                    const nuevoValor = proporcion;
                    console.log("RESULTADO: "+nuevoValor);
                    ingredientRefs.current[index]?.current?.actualizarValor(nuevoValor);
                }
            });
        }
        else{
            comensalRef.current?.current?.actualizarValor(proporcion);
            coleccion.forEach((item, index) => {
                if (item.key != indice){
                    console.log("INGREDIENTE: "+item.itemData.idIngrediente.nombre);
                    console.log("Cantidad original: " +item.cantidadOriginal);
                    console.log("Proporcion: "+proporcion)
                    const nuevoValor = proporcion;
                    console.log("RESULTADO: "+nuevoValor);
                    ingredientRefs.current[index]?.current?.actualizarValor(nuevoValor);
                }
            });
        }
    }

    if(loaded){

        return(
            <PantallaTipoHome contenido={
                
                <View>
                    <Text style={{textAlign:'center',fontWeight:'bold',fontSize:30}}> {route.params.nombreReceta} </Text>
                    <Text style={{textAlign:'center',color:'black',fontSize:15}} > Ingredientes </Text>
                    <CajaComensales
                    ref={comensalRef}
                    cantidadComensales={comensales}
                    onChange={(texto:number) => {
                        const cantidad = texto;
                        if (!isNaN(cantidad)) {
                            const factor = cantidad/comensales
                            console.log("Factor: "+factor);
                            actualizarCantidades(factor, -1);
                        }}}                
                    
                    />
                    <ScrollView style={{height:530}}>
                        {coleccionIngredientes.map((item, index) => {
                            return <React.Fragment key={index}>{item}</React.Fragment>;
                        })}
                    </ScrollView>




                    <View style={{backgroundColor:'white',width:'100%', position:'absolute', height:50, bottom:0,alignSelf:'center',zIndex:80}}>
                        <TouchableOpacity onPress={()=> agregarAsync()} style={{marginTop:6,display:"flex", backgroundColor:'#F0AF23',height:'100%',width:335,minHeight:50,alignSelf:"center", justifyContent:'center', borderRadius: 20}}>
                            <Text style={{alignSelf:"center",fontSize:20,borderRadius:25, justifyContent:"center"}}>AGREGAR A MI LISTA</Text>
                        </TouchableOpacity>
                    </View>
                    <Modal isVisible ={modalError}>
                        <View style={{display:'flex',flexDirection:'column',width:370,height:400,backgroundColor:'#FCB826',borderRadius:20,alignItems:'center',justifyContent:'space-around'}}>
                          
                            <Text style={{fontWeight:'bold',fontSize:15, color:'black'}}> Error al agregar la receta, usted alcanzó el limite de las 10 recetas guardadas.</Text>

                        </View>
                    </Modal>
                </View>
                
            }/>   
        )
    }
    else{
        return(<Text>Cargando...</Text>)
    }

}