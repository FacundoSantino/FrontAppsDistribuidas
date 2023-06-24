import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import estiloApp from "../estilos/estiloApp";
import PantallaTipoHome from "../componentes/PantallaTipoHome";
import { ScrollView } from "react-native-gesture-handler";
import React, { useState } from "react";
import CajaComentarios from "../componentes/CajaComentarios";
import { TipoParametros, localip } from "../App";
import { RouteProp, useRoute } from "@react-navigation/native";
import IconoCruz from '../assets/cruz.png';
import fotoEstrellaLlena from '../assets/estrellaLlena.png';
import fotoEstrellaVacia from '../assets/estrellaVacia.png';
type ComentariosProps= RouteProp<TipoParametros, "Comentarios">;
import Modal from "react-native-modal";

export default function Comentarios(){
    const [p,setP]=useState<any[]>([]);
    const [cargoPantalla,setCargoPantalla]=useState(false);
    const route=useRoute<ComentariosProps>();
    const[levantada,setLevantada]=useState(false);
    const[enviada,setEnviada]=useState(false);
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

                    <TouchableOpacity style={{display:"flex",backgroundColor:"#FCB826",borderRadius:45, width:200,marginVertical:10,paddingVertical:5,alignSelf:"center",justifyContent:"center",height:41}}
                    
                    >
                        <Text onPress={()=>setLevantada(!levantada)} style={{alignSelf:"center", justifyContent:"center",fontSize:16,color:"black",fontWeight:"bold"}}>
                            AGREGAR COMENTARIO
                        </Text>
                    </TouchableOpacity>
                    <Modal isVisible = {levantada}>
                    <TouchableOpacity onPress={() => setLevantada(!levantada)} style={{display:'flex',justifyContent:'center',alignItems:'flex-start',height:30,width:340}}>
                        <Image source={IconoCruz} style={{width:20,height:20,marginLeft:10,marginTop:30}}/>
                    </TouchableOpacity>
                    <View style={{display:'flex',flexDirection:'column',width:370,height:300,backgroundColor:'#FCB826',borderRadius:20,alignItems:'center',justifyContent:'space-around'}}>
                        <TouchableOpacity onPress={()=>setLevantada(!levantada)} style={{display:'flex',justifyContent:'center',alignItems:'flex-start',height:30,width:340}}>
                            <Image source={IconoCruz} style={{width:20,height:20,marginLeft:10}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{console.log("hola")}} style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',height:30,width:340}}>
                            
                            <Image source={fotoEstrellaVacia} style={{width:25,height:25}}/>
                            <Image source={fotoEstrellaVacia} style={{width:25,height:25}}/>
                            <Image source={fotoEstrellaVacia} style={{width:25,height:25}}/>
                            <Image source={fotoEstrellaVacia} style={{width:25,height:25}}/>
                            <Image source={fotoEstrellaVacia} style={{width:25,height:25}}/>
                        </TouchableOpacity>
                        <Text style={{textAlign:'center',fontWeight:'bold', fontSize:17}}>Valora la receta!</Text>

                        <ScrollView style={{borderRadius:10,minHeight:10,height:100,backgroundColor:'white', maxHeight:130, width:350,borderColor:'black',borderWidth:2.3}}>
                        <TextInput >

                        </TextInput>
                        </ScrollView>
                        <TouchableOpacity onPress={() => {setTimeout(()=>setEnviada(false),3000); setLevantada(!levantada); setEnviada(!enviada);}} style={{marginTop:3,display:"flex", backgroundColor:'white',width:100,alignSelf:"center", justifyContent:'center', borderRadius: 20,height:35}}>
                            <Text style={{alignSelf:"center",fontSize:15,borderRadius:25, justifyContent:"center"}}>Enviar</Text>
                        </TouchableOpacity>

                    </View>
                </Modal>

                <Modal isVisible = {enviada}>
                    
                    <View style={{display:'flex',flexDirection:'column',width:370,height:200,backgroundColor:'#FCB826',borderRadius:20,alignItems:'center',justifyContent:'space-around'}}>
                        <View style={{display:'flex',height:30,width:350,justifyContent:'flex-start'}}>
                        <TouchableOpacity onPress={()=>setEnviada(!enviada)} style={{display:'flex',justifyContent:'center',alignItems:'flex-start',height:30,width:340}}>
                            <Image source={IconoCruz} style={{width:20,height:20,marginLeft:10}}/>
                        </TouchableOpacity>
                        </View>
                        <Text style={{textAlign:'center',fontWeight:'bold', fontSize:17,height:110,marginTop:40}}>Su valoración ha sido enviada exitosamente y está esperando la moderación</Text>
                    </View>
                </Modal>

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