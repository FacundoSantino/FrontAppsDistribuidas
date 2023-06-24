import { View, Text, ScrollView, TouchableOpacity, Image} from "react-native";
import PantallaTipoHome from "../componentes/PantallaTipoHome";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import CajaComensales from "../componentes/CajaComensales";
import CajaPorciones from "../componentes/CajaPorciones";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { localip } from "../App";
import Modal from "react-native-modal";
import IconoCruz from"../assets/cruz.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Cargando from "../componentes/Cargando";




export default function CrearReceta(){
    const navigation=useNavigation();
    const [tipoSeleccionado,setTipoSeleccionado]=useState<number>();
    const [tipos,setTipos]=useState<{idTipo:number,descripcion:string,foto:string}[]>([]);
    const [loaded,setLoaded]=useState(false);
    const [nombreReceta,setNombreReceta]=useState("");
    const [descripcionReceta,setDescripcionReceta]=useState("");
    const [comensales,setComensales]=useState<number>(1);
    const [porciones,setPorciones]=useState<number>(1);
    const [levantadoFaltanCosas,setLevantadoFaltanCosas]=useState(false);

    const urlFetchTipos="http://"+localip+":8080/api/rest/morfar/getRecipeTypes";

    const fetchTipos= async() => {
        try{
            const respuesta= await fetch(urlFetchTipos);
            const data = await respuesta.json();
            return data;
        }
        catch(err){
            console.log(err);
        }
    }
    const cargarCosas= async() => {
        await fetchTipos().then((data) => setTipos(data));
    }

    const guardarAsync= async(direccion:string,cosa:any) => {
        await AsyncStorage.setItem(direccion,cosa.toString());
    }

    const chequearIncompleto=async() => {
        const nombre=await AsyncStorage.getItem("nombreReceta");
        const descripcion=await AsyncStorage.getItem("descripcionReceta");
        const comensalesL=await AsyncStorage.getItem("comensales");
        const porcionesL=await AsyncStorage.getItem("porciones");
        const idTipoReceta=await AsyncStorage.getItem("idTipoReceta");
        
        if(nombre!=null){
            console.log("1");
            setNombreReceta(nombre);
        }
        if(descripcion!=null){
            console.log("2");
            setDescripcionReceta(descripcion);
        }
        if(comensalesL!=null){
            console.log("3");
            setComensales(parseInt(comensalesL));
        }
        if(porcionesL!=null){
            console.log("4");
            setPorciones(parseInt(porcionesL));
        }
        if(idTipoReceta!=null){
            console.log("5");
            setTipoSeleccionado(parseInt(idTipoReceta));
        }
        
    }

    if(!loaded){
        cargarCosas().then(() => chequearIncompleto()).finally(() => setLoaded(true));
    }

    const opcionVaciaTipo = () => {
        if(tipoSeleccionado==undefined){
            return (<Picker.Item label='Elija el tipo' enabled={false}/>);
        }
        else{
            return(null);
        }
    }

    function irAPasosReceta() {
        if(nombreReceta=="" || descripcionReceta=="" || comensales==0 || porciones==0 || tipoSeleccionado==undefined){
            setLevantadoFaltanCosas(true);
        }
        else{
            navigation.navigate("CrearRecetaPasos" as never,{nombreReceta:nombreReceta,descripcionReceta:descripcionReceta,comensales:comensales,porciones:porciones,idTipoReceta:tipoSeleccionado} as never);
        }
    }
    if(loaded){
        return(
            <PantallaTipoHome contenido={
                <View style={{display:'flex',flexDirection:'column',justifyContent:'space-around',alignContent:'center',minHeight:300,width:380}}>
                    <Modal isVisible={levantadoFaltanCosas}>
                        <View style={{display:'flex',flexDirection:'column',width:370,height:200,backgroundColor:'#FCB826',borderRadius:20}}>
                        <TouchableOpacity onPress={()=>setLevantadoFaltanCosas(false)} style={{display:'flex',justifyContent:'center',alignItems:'flex-start',height:30,width:340}}>
                            <Image source={IconoCruz} style={{width:20,height:20,marginLeft:10}}/>
                        </TouchableOpacity>
                        <View style={{display:'flex',flexDirection:'column',width:370,height:150,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:20,color:'black'}}>Faltan cosas!</Text>
                            <Text style={{fontSize:16,color:'black',width:300,textAlign:'center'}}>Completá todos los campos primero</Text>
                        </View>
                        </View>
                    </Modal>
                    <Text style={{color:"#808080", fontSize:12,alignSelf:"flex-end"}}>1/4</Text>
                    <Text style={{fontWeight:'bold',fontSize:40,color:'black',textAlign:'center',marginBottom:10}}> Crear Receta</Text>
                    <Text style={{textAlign:'center',color:'black',fontSize:17 ,marginBottom:15}}>Nombre de la receta</Text>
                    <ScrollView contentContainerStyle={{alignItems:'center'}}  style={{borderWidth:2,borderColor:'black',borderRadius:20,height:50 ,width:350,alignSelf:'center',marginBottom:10}}>
                        <TextInput value={nombreReceta} autoCorrect={false} onChange={(text) => {setNombreReceta(text.nativeEvent.text);guardarAsync("nombreReceta",text.nativeEvent.text)}} style={{height:50 ,width:340}}></TextInput>
                    </ScrollView>
                    <Text style={{textAlign:'center',color:'black' ,fontSize:17 ,marginBottom:15}}>Descripcion</Text>
                    <ScrollView contentContainerStyle={{alignItems:'center'}}  style={{borderWidth:2,borderColor:'black',borderRadius:20,height:160 ,width:350,alignSelf:'center',marginBottom:10}}>
                        <TextInput textAlignVertical={"top"}
                                    textBreakStrategy={"highQuality"}
                                    value={descripcionReceta}
                                    onChange={(event) => {setDescripcionReceta(event.nativeEvent.text);guardarAsync("descripcionReceta",event.nativeEvent.text)}}
                                    underlineColorAndroid={"transparent"}
                                    autoCorrect={false} multiline={true} style={{flex: 1,
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    paddingHorizontal: 5,
                                    marginTop: 10,
                                    flexWrap: "wrap",height:160 ,width:340, textAlign:"left"}}></TextInput>
                    </ScrollView>
                    <Text style={{textAlign:'center',color:'black',fontSize:17 ,marginBottom:5}}>Comensales</Text>
                    <CajaComensales 
                        cantidadComensales={1}
                        onChange={(text) => {setComensales(text);guardarAsync("comensales",text);}}
                    />
                    <Text style={{textAlign:'center',color:'black',fontSize:17 ,marginBottom:5}}>Porciones</Text>
                    <CajaPorciones
                        cantidadPorciones={1}
                        onChange={(text:number) => {setPorciones(text);guardarAsync("porciones",text)}}
                    />
                    <Text style={{textAlign:'center',color:'black',fontSize:17 ,marginBottom:5}}>Tipo</Text>
                    <View style={{borderWidth:2,borderRadius:45,justifyContent:"space-around", width: "50%", alignSelf:'center',marginBottom:20,marginTop:5}}>
                        <Picker
                            selectedValue={tipoSeleccionado}
                            onValueChange={(itemValue) =>
                                {setTipoSeleccionado(itemValue);
                                guardarAsync("idTipoReceta",itemValue);}
                            }
                            placeholder='Selecciona un ingrediente'
                            >
                            {opcionVaciaTipo()}
                            {tipos.map((item,i) => (
                                <Picker.Item label={item.descripcion} value={item.idTipo} key={i} />
                            ))}
                        </Picker> 
                    </View>
                    <View style={{backgroundColor:'white',width:'100%', height:5, bottom:0,alignSelf:'center',zIndex:80,marginTop:0}}>
                            <TouchableOpacity onPress={() => irAPasosReceta()}style={{display:"flex", backgroundColor:'#F0AF23',height:'100%',width:200,minHeight:50,alignSelf:"center", justifyContent:'center', borderRadius: 20}}>
                                <Text style={{alignSelf:"center",fontSize:20,borderRadius:25, justifyContent:"center"}}>Siguiente</Text>
                            </TouchableOpacity>
                    </View>
                    
                </View> 
            }/>
        )}
    else{
        return(<View></View>);
    }

}