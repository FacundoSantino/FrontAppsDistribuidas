import { RouteProp, useRoute } from "@react-navigation/native";
import { TipoParametros, Utilizado, localip } from "../App";
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import PantallaTipoHome from "./PantallaTipoHome";
import { useState } from "react";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage, { useAsyncStorage } from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";
import estiloApp from '../estilos/estiloApp';
import fotoComensales from "../assets/comensales.png";
import { Float } from "react-native/Libraries/Types/CodegenTypes";
type IngredientesProps= RouteProp<TipoParametros, "IngredientesLocales">;


export default function IngredientesLocal() :JSX.Element {
    const route=useRoute<IngredientesProps>();
    const [modalError, setModalError] = useState(false);
    const[loaded,setLoaded]=useState(false);
    const [data,setData]=useState<Utilizado[]>([]);
    let coleccion: { key: number, itemData: Utilizado, cantidadOriginal: number }[] = [];
    const urlFetchUtilizados="http://"+localip+":8080/api/rest/morfar/utilizadosReceta/";
    const [valorIngredientes, setValorIngredientes] = useState<any[]>([]);
    const [valorIngredientesFijos, setValorIngredientesFijos] = useState<any[]>([]);
    const [valorComensales,setValorComensales]= useState(0);
    const [valorComensalesOriginal,setValorComensalesOriginal]= useState(0);
    
    if(!loaded){
        
        setValorComensales(route.params.receta?.cantidadPersonas);
        setValorComensalesOriginal(route.params.receta?.cantidadPersonas);
        const ingredientesValor: any[] = [];
        
        setValorIngredientesFijos(route.params.ingredientes);
        setValorIngredientes(route.params.ingredientes);
        setData(route.params.infoIngredientes);
        
        setLoaded(true);
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

    if(loaded){
        return(
            <PantallaTipoHome contenido={
                
                <View>
                    <Text style={{textAlign:'center',fontWeight:'bold',fontSize:30,color:'black',marginBottom:10}}> {route.params.nombreReceta} </Text>
                    <Text style={{textAlign:'center',color:'black',fontSize:20,fontWeight:'bold'}}> Ingredientes </Text>
                    
                    <View style={[styles.flexRow,{borderWidth:2,borderRadius:45,justifyContent:"space-around", width: "50%", alignSelf:'center',marginBottom:20,marginTop:5}]}>
                        <View style={{width:"10%", marginLeft:-15}}>
                            <Image source={fotoComensales}/>
                        </View>
                        <View style={{display:"flex",marginLeft:20,justifyContent:"center", }}>
                            <TouchableOpacity onPress={() => {handleComensales(false)}}><Text style={{fontSize: 25, fontWeight: 'bold',color:'black'}}>-</Text></TouchableOpacity>
                        </View>
                        <View>
                            <Text style={{color:'black',fontWeight:'bold'}}>{valorComensales}</Text>
                        </View>
                        <View>
                            <TouchableOpacity  onPress={() => {handleComensales(true)}}><Text style={{fontSize: 25, fontWeight: 'bold',color:'black'}}>+</Text></TouchableOpacity>
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
                                    <Text style={{fontWeight:'bold',fontSize:20,color:'black'}}>{item.unidad.descripcion}</Text>
                                </View> 
                            </React.Fragment>
                        ))}
                    </ScrollView>

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