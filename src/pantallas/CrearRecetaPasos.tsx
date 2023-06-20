import { View, Text, ScrollView, TouchableOpacity, Image} from "react-native";
import PantallaTipoHome from "../componentes/PantallaTipoHome";
import Modal from "react-native-modal";
import fotoCruz from "../assets/cruz.png";
import React, { useState } from "react";
import CajaPaso from "../componentes/CajaPaso";



export default function CrearRecetaPasos(){
    const [levantada, setLevantada] = useState(false);
    const[listaPasos,setListaPasos]=useState([]);
    
    return(
        <PantallaTipoHome contenido={
            <View style={{display:'flex',flexDirection:'column',justifyContent:'space-around',alignContent:'center',minHeight:300,width:380}}>
                <Text style={{fontWeight:'bold',fontSize:40,color:'black',textAlign:'center',marginBottom:30}}>Pasos</Text>
                
                <TouchableOpacity onPress={() => {setLevantada(true)}} style={{borderWidth:2,display:"flex", backgroundColor:'#F0AF23',height:50,width:200,minHeight:50,alignSelf:"center", justifyContent:'center',marginBottom:30, borderRadius: 20}}>
                    <Text style={{alignSelf:"center",fontSize:20,borderRadius:25, justifyContent:"center"}}>Agregar Paso</Text>
                </TouchableOpacity>
                
                <ScrollView contentContainerStyle={{alignItems:'center'}}  style={{borderWidth:2,borderColor:'black',borderRadius:20,height:160 ,width:350,alignSelf:'center',marginBottom:20}}>
                    <CajaPaso onPress={() => {}} numeroPaso={1} descripcion="Cocina" />
                </ScrollView>
                
                <View style={{backgroundColor:'white',width:'100%', height:5, bottom:0,alignSelf:'center',zIndex:80,marginTop:150}}>
                        <TouchableOpacity style={{display:"flex", backgroundColor:'#F0AF23',height:'100%',width:200,minHeight:50,alignSelf:"center", justifyContent:'center', borderRadius: 20}}>
                            <Text style={{alignSelf:"center",fontSize:20,borderRadius:25, justifyContent:"center"}}>Siguiente</Text>
                        </TouchableOpacity>
                </View>

                <Modal isVisible = {levantada}>
                    
                    <View style={{display:'flex',flexDirection:'column',width:370,height:400,backgroundColor:'#FCB826',borderRadius:20,alignItems:'center',justifyContent:'space-around'}}>
                        <TouchableOpacity onPress={() => setLevantada(false)}>
                            <Image source={fotoCruz} style={{width:30,height:30, position:'absolute',left:-180,top:0}}/>
                        </TouchableOpacity>
                        <Text style={{fontWeight:'bold',fontSize:15, color:'black'}}> Crear Paso</Text>
                        <ScrollView contentContainerStyle={{alignItems:'center'}}  style={{borderWidth:2,marginTop:5,borderColor:'black',borderRadius:20,width:300,height: 120,alignSelf:'center',backgroundColor:'white',marginBottom:10}}>
                            <Text></Text>
                        </ScrollView>
                        <TouchableOpacity style={{borderWidth:2,display:"flex", backgroundColor:'white',height:'7%',width:190,minHeight:50,alignSelf:"center", justifyContent:'center', borderRadius: 20,marginBottom:10}}>
                            <Text style={{alignSelf:"center",fontSize:17,borderRadius:25, justifyContent:"center"}}>Agregar multimedia</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{display:"flex", backgroundColor:'#F0AF23',height:7,width:120,minHeight:50,alignSelf:"center", justifyContent:'center', borderRadius: 20,marginBottom:10 ,borderWidth:2}}>
                            <Text style={{alignSelf:"center",fontSize:17,borderRadius:25, justifyContent:"center"}}>Agregar</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View> 
            
        }/>
        
    )

}