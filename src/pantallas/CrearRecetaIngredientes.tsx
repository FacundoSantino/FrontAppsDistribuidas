
import { useState, useEffect} from 'react';
import PantallaTipoHome from '../componentes/PantallaTipoHome';
import {View, Text, TouchableOpacity, Image, ScrollView, TextInput, StyleSheet} from "react-native";
import Modal from "react-native-modal"; 
import fotoCruz from "../assets/cruz.png";
import CajaIngrediente from '../componentes/CajaIngrediente';
import CajaIngredientesRecetas from '../componentes/CajaIngredienteRecetas';
import { localip } from '../App';
import {Picker} from '@react-native-picker/picker';
import estiloApp from '../estilos/estiloApp';
import CajaComensales from '../componentes/CajaComensales';
import CajaPaso from '../componentes/CajaPaso';
import { useNavigation } from '@react-navigation/native';

export default function CrearRecetaIngredientes(){
    const [levantada, setLevantada] = useState(false);
    const [ingredientes,setIngredientes]=useState<{idIngrediente:number,nombre:string,urlFoto:string}[]>([]);
    const [unidades,setUnidades]=useState<{idUnidad:number,descripcion:string}[]>([]);
    const [loaded,setLoaded]=useState(false);
    const urlBase="http://"+localip+":8080/api/rest/morfar";
    const urlFetchUnidades=urlBase+"/getUnidades";
    const urlFetchIngredientes=urlBase+"/ingredients";
    const [ingredienteSeleccionado,setIngredienteSeleccionado]=useState<{idIngrediente:number,nombre:string,urlFoto:string}>();
    const [unidadSeleccionada,setUnidadSeleccionada]=useState<{idUnidad:number,descripcion:string}>();
    const [cantidadSeleccionada,setCantidadSeleccionada]=useState<number>();
    const [contador,setContador]=useState<number>(0);
    const [listaIngredientes, setListaIngredientes]= useState<{idIngrediente:number,idUnidad:number,cantidad:number,observaciones:string,nombreIngrediente:string,nombreUnidad:string,identificador:number}[]>([]);
    
    const navigation=useNavigation();

    const agregarIngrediente = (ingrediente:{idIngrediente:number,nombre:string,urlFoto:string},unidad:{idUnidad:number,descripcion:string},cantidad:number) => {
        listaIngredientes.push({idIngrediente:ingrediente.idIngrediente,idUnidad:unidad.idUnidad,cantidad:cantidad,observaciones:"",nombreIngrediente:ingrediente.nombre,nombreUnidad:unidad.descripcion,identificador:contador});
        setContador(contador+1);
        setLevantada(false);
    }

    const ingredientesFetch= async () => {
        try{
            const respuesta= await fetch(urlFetchIngredientes);
            const data = await respuesta.json();
            return data;
        }
        catch(err){
            console.log(err);
        }
    
    }
    const unidadesFetch= async () => {
        try{
            const respuesta= await fetch(urlFetchUnidades);
            const data = await respuesta.json();
            return data;
        }
        catch(err){
            console.log(err);
        }
    
    }

    const opcionVaciaIngrediente= () => {
        if(ingredienteSeleccionado==undefined){
            return(<Picker.Item label='' enabled={false}/>)
        }
        else{
            return(null);
        }
    }

    const opcionVaciaUnidad= () => {
        if(unidadSeleccionada==undefined){
            return(<Picker.Item label='' enabled={false}/>)
        }
        else{
            return(null);
        }
    }

    const cargarCosas = async  () =>{
        await ingredientesFetch().then(data=>setIngredientes(data));
        
        await unidadesFetch().then(data=>setUnidades(data));
    }
    
    if(!loaded){
        cargarCosas().finally(() => setLoaded(true));
       
    }

    if(loaded){
        return(
            <PantallaTipoHome contenido={
                <View style={{display:'flex',flexDirection:'column',justifyContent:'space-around',alignContent:'center'}}>
                    <Text style={{color:"#808080", fontSize:12,alignSelf:"flex-end"}}>3/4</Text>
                    <Text style={{fontWeight:'bold',fontSize:40,color:'black',textAlign:'center',marginBottom:30}}>Ingredientes</Text>
                    <TouchableOpacity onPress={() => setLevantada(true)} style={{borderWidth:2,display:"flex", backgroundColor:'#F0AF23',height:50,width:200,minHeight:50,alignSelf:"center", justifyContent:'center',marginBottom:30, borderRadius: 20}}>
                        <Text style={{alignSelf:"center",fontSize:20,borderRadius:25, justifyContent:"center"}}>Agregar ingrediente</Text>
                    </TouchableOpacity>
                    <ScrollView contentContainerStyle={{alignItems:'center'}}  style={{borderWidth:2,borderColor:'black',borderRadius:20,height:500 ,width:350,alignSelf:'center',marginBottom:20}}>
                    {listaIngredientes.map((item,i) => (<CajaPaso key={i} onPress={() => {setListaIngredientes(listaIngredientes.filter((itemb) => item.identificador!=itemb.identificador));}} numeroPaso={i+1} descripcion={item.cantidad+" "+item.nombreUnidad+" de "+item.nombreIngrediente} />))}
                    </ScrollView>

                    <TouchableOpacity onPress={() => {navigation.navigate("CrearRecetaImagenes" as never)}} style={{borderWidth:2,display:"flex", backgroundColor:'#F0AF23',height:50,width:200,minHeight:50,alignSelf:"center", justifyContent:'center',marginBottom:30, borderRadius: 20}}>
                        <Text style={{alignSelf:"center",fontSize:20,borderRadius:25, justifyContent:"center"}}>Siguiente</Text>
                    </TouchableOpacity>
                    
                    <Modal isVisible = {levantada}>
                        
                        <View style={{display:'flex',flexDirection:'column',width:370,height:'55%',backgroundColor:'#FCB826',borderRadius:25,alignItems:'center',justifyContent:'center'}}>
                            <TouchableOpacity onPress={() => setLevantada(!levantada)}>
                                <Image source={fotoCruz} style={{width:30,height:30, position:'relative',left:-165,top:20}}/>
                            </TouchableOpacity>
                            <View style={[{height: '100%'}]}>
                                <Text style={{color:'black',alignSelf:'center', fontWeight:'bold', fontSize:20,marginBottom:20}}>AGREGAR INGREDIENTE</Text>
                                <View>
                                
                                <View style={{display:'flex', flexDirection:'row',justifyContent:'space-around'}}>
                                    <View style={{display:'flex', flexDirection:'column', width:130,marginBottom:10}}>
                                        <Text style={{color:'black',alignSelf:'center', fontWeight:'bold', fontSize:20}}>CANTIDAD</Text>
                                        <TextInput 
                                            keyboardType='numeric'
                                            onChangeText={(text) => setCantidadSeleccionada(parseFloat(text))}
                                            value={cantidadSeleccionada?.toString()}
                                            maxLength={10}
                                            style={{backgroundColor:"white",borderRadius:25}}
                                        />
                                    </View>
                                </View>
                                <View style={{display:'flex', flexDirection:'column',marginBottom:20}}>
                                        <Text style={{color:'black',alignSelf:'center', fontWeight:'bold', fontSize:20}}>UNIDAD</Text>
                                        <View style={{backgroundColor:"white",borderRadius:25}}>
                                            <Picker
                                                selectedValue={unidadSeleccionada}
                                                onValueChange={(itemValue, itemIndex) =>
                                                    setUnidadSeleccionada(itemValue)
                                                }
                                                placeholder='Selecciona una unidad'
                                                >
                                                {opcionVaciaUnidad()}
                                                {unidades.map((item,i) => (
                                                    <Picker.Item label={item.descripcion} value={item} key={i} />
                                                ))}
                                            </Picker>
                                        </View>
                                </View>
                                <Text style={{color:'black',alignSelf:'center', fontWeight:'bold', fontSize:20}}>INGREDIENTE</Text> 
                                <View style={{backgroundColor:"white",borderRadius:25,marginBottom:10}}>
                                    
                                    <Picker
                                        selectedValue={ingredienteSeleccionado}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setIngredienteSeleccionado(itemValue)
                                        }
                                        placeholder='Selecciona un ingrediente'
                                        >
                                        {opcionVaciaIngrediente()}
                                        {ingredientes.map((item,i) => (
                                            <Picker.Item label={item.nombre} value={item} key={i} />
                                        ))}
                                    </Picker> 
                                </View>
                                    
                                <TouchableOpacity onPress={() => {if(typeof ingredienteSeleccionado!="undefined" && typeof unidadSeleccionada!="undefined" && typeof cantidadSeleccionada!="undefined"){ agregarIngrediente(ingredienteSeleccionado,unidadSeleccionada,cantidadSeleccionada)}}} style={{display:"flex", backgroundColor:'white',height:5,width:120,minHeight:50,alignSelf:"center", position:'absolute', bottom:-100, borderRadius: 20,marginBottom:10 ,borderWidth:2}}>
                                    <Text style={{alignSelf:"center", verticalAlign:"middle", height:'100%',fontSize:17,borderRadius:25}}>Agregar</Text>
                                </TouchableOpacity>
                                </View>
                            </View>
                            
                        </View>
                    </Modal>
                </View>
                
            }/>
        );
    }
    else{
        return(<View></View>)
    }
}

const styles=StyleSheet.create(estiloApp);