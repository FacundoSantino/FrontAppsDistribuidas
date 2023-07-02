import { RouteProp, useRoute } from "@react-navigation/native";
import { TipoParametros, Utilizado, localip } from "../App";
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import PantallaTipoHome from "./PantallaTipoHome";
import { MutableRefObject, useRef, useState } from "react";
import React from "react";
import CajaIngredientesRecetas from "./CajaIngredienteRecetas";
import CajaComensales from "./CajaComensales";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage, { useAsyncStorage } from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";
import estiloApp from '../estilos/estiloApp';
import fotoComensales from "../assets/comensales.png";
import { Float } from "react-native/Libraries/Types/CodegenTypes";
import { string } from "prop-types";
type IngredientesProps= RouteProp<TipoParametros, "Ingredientes">;


export default function Ingredientes() :JSX.Element {
    const route=useRoute<IngredientesProps>();
    const addip = "http://"+localip +":8080/api/rest/morfar/getRecipe/"+route.params.idReceta;
    const addpaso = "http://"+localip +":8080/api/rest/morfar/getPasos/"+route.params.idReceta;
    const [modalError, setModalError] = useState(false);
    const[loaded,setLoaded]=useState(false);
    const [data,setData]=useState<Utilizado[]>([]);
    let coleccion: { key: number, itemData: Utilizado, cantidadOriginal: number }[] = [];
    const urlFetchUtilizados="http://"+localip+":8080/api/rest/morfar/utilizadosReceta/"
    const [valorIngredientes, setValorIngredientes] = useState<any[]>([]);
    const [valorIngredientesFijos, setValorIngredientesFijos] = useState<any[]>([]);
    const [valorComensales,setValorComensales]= useState(0);
    const [valorComensalesOriginal,setValorComensalesOriginal]= useState(0);
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
            setValorComensales(d[0]?.idReceta?.cantidadPersonas);
            setValorComensalesOriginal(d[0]?.idReceta?.cantidadPersonas);
            const contenidoMapeado: Utilizado[] =[];
            const ingredientesValor: any[] = [];
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
                    ingredientesValor.push(item.cantidad)
                    }
            );
            setValorIngredientesFijos(ingredientesValor);
            setValorIngredientes(ingredientesValor);
            setData(contenidoMapeado);
        })
        .finally(()=> setLoaded(true)); 
        
        
    }
    

    // function comensalesElemento() {
    //     ingredientRefs.current[0] = {current: { actualizarValor: () => {} }};
    //     return(
            
    //                 <CajaComensales
    //                 ref={ingredientRefs.current[0]}
    //                 cantidadComensales={comensales}
    //                 key={0}
    //                 onChange={(texto:number) => {
                        
    //                     const cantidad = texto;
    //                     if (!isNaN(cantidad)) {
    //                         const factor = cantidad/comensales
    //                         console.log("Factor: "+factor);
    //                         actualizarCantidades(factor, -1);
    //                     }}}                
                    
    //                 />
            
    //                 );
                    
    // }
    
    // function actualizarCantidades(proporcion: number, key:number) {
    //         const indice = coleccion.findIndex(item => item.key === key);
    //         console.log("_________________________________________");
    //         console.log("indice "+indice);
    //         coleccion.forEach((item, index) => {
    //             console.log(item.key+" "+item.itemData?.idIngrediente.nombre);
    //             if (item.key != indice){
    //                 console.log("debería actualizarse");
    //                 ingredientRefs.current[index]?.current?.actualizarValor(proporcion);
    //             }});
    //         }
    const handleComensales = (aumentar:Boolean)=>{
        if(aumentar){
            //logica para multiplicar ingredientes
            const listaPrevia :any = [...valorIngredientesFijos];
            data.map((item,key)=>{
                listaPrevia[key] = (listaPrevia[key]*(valorComensales+1)/valorComensalesOriginal).toFixed(2);    
            });
            setValorComensales(valorComensales+1)
            setValorIngredientes(listaPrevia);
        }
        else if(valorComensales>1){
            //logica para dividir ingredientes
            const listaPrevia :any = [...valorIngredientesFijos];
            data.map((item,key)=>{
                listaPrevia[key] = (listaPrevia[key]/((valorComensales-1)/valorComensalesOriginal)).toFixed(2);    
            });
            setValorIngredientes(listaPrevia);
            setValorComensales(valorComensales-1);
        }
    }
    const handleIngredientes = (id: number,cantidad:string) => {
        const cantIngrediente: Float= parseFloat(cantidad);
        const listaPrevia :any = [...valorIngredientesFijos];
        const original = valorIngredientesFijos[id];
        const proporcion = (cantIngrediente)/original;
        if(!isNaN(cantIngrediente)){
            data.map((item,key)=>{
                if(key!=id){
                    listaPrevia[key] = (listaPrevia[key]*proporcion).toFixed(1);  
                }
            });
            listaPrevia[id] = cantidad;
            setValorIngredientes(listaPrevia);
        }
        else{
            listaPrevia[id] = cantidad;
            setValorIngredientes(listaPrevia);
        }
    }
        
    

    if(loaded){
        return(
            <PantallaTipoHome contenido={
                
                <View>
                    <Text style={{textAlign:'center',fontWeight:'bold',fontSize:30}}> {route.params.nombreReceta} </Text>
                    <Text style={{textAlign:'center',color:'black',fontSize:15}}> Ingredientes </Text>
                    
                    <View style={[styles.flexRow,{borderWidth:2,borderRadius:45,justifyContent:"space-around", width: "50%", alignSelf:'center',marginBottom:20,marginTop:5}]}>
                        <View style={{width:"10%", marginLeft:-15}}>
                            <Image source={fotoComensales}/>
                        </View>
                        <View style={{display:"flex",marginLeft:20,justifyContent:"center", }}>
                            <TouchableOpacity onPress={() => {handleComensales(false)}}><Text style={{fontSize: 25, fontWeight: 'bold'}}>-</Text></TouchableOpacity>
                        </View>
                        <View>
                            <Text>{valorComensales}</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => {handleComensales(true)}}><Text style={{fontSize: 25, fontWeight: 'bold'}}>+</Text></TouchableOpacity>
                        </View>
                    </View>
                    
                    <ScrollView style={{height:530}}>
                        {data.map((item,key) => (
                            <React.Fragment>
                                <View style={{display:"flex",flexDirection: "row",alignItems: "center",justifyContent: "space-around",borderRadius:40,borderColor:"black",height:60, borderWidth: 2, marginBottom:20,marginTop:5}}> 
                                    <Text style={{fontWeight:'bold',fontSize:20,color:'black'}}>{item.idIngrediente.nombre}</Text>
                                    <TextInput 
                                        keyboardType='numeric'
                                        onChangeText={(text)=> {handleIngredientes(key,text)}}
                                        value={valorIngredientes[key].toString()}
                                        maxLength={10}
                                        style={{fontWeight:'bold',fontSize:20,borderLeftColor:'black',borderRightColor:'black',borderWidth:1,minWidth:70,maxWidth:120,flexWrap:"wrap" ,height:60,textAlign:'center'}}
                                    />
                                    <Text style={{fontWeight:'bold',fontSize:20}}>{item.unidad.descripcion}</Text>
                                </View> 
                            </React.Fragment>
                        ))}
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

const styles= StyleSheet.create(estiloApp);