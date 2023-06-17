
import { useState } from 'react';
import PantallaTipoHome from '../componentes/PantallaTipoHome';
import {View, Text, TouchableOpacity, Image, ScrollView, TextInput} from "react-native";
import Modal from "react-native-modal"; 
import fotoCruz from "../assets/cruz.png";
export default function CrearRecetaIngredientes(){
    const [levantada, setLevantada] = useState(false);
    return(
        <PantallaTipoHome contenido={
            <View style={{display:'flex',flexDirection:'column',justifyContent:'space-around',alignContent:'center',minHeight:300,width:380}}>
                <Text style={{fontWeight:'bold',fontSize:40,color:'black',textAlign:'center',marginBottom:50}}>Ingredientes</Text>
                <View style={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-around',alignItems:'flex-end'}}>
                    <View style={{backgroundColor:'white',width:'100%', height:5, bottom:0,alignSelf:'center',zIndex:80,marginTop:150}}>
                            <TouchableOpacity onPress={() => {setLevantada(true)}} style={{display:"flex", backgroundColor:'#F0AF23',height:'100%',width:200,minHeight:50,alignSelf:"center", justifyContent:'center', borderRadius: 20}}>
                                <Text style={{alignSelf:"center",fontSize:20,borderRadius:25, justifyContent:"center"}}>Crear Ingrediente</Text>
                            </TouchableOpacity>
                    </View>
                    <View style={{backgroundColor:'white',width:'100%', height:5, bottom:0,alignSelf:'center',zIndex:80,marginTop:150}}>
                            <TouchableOpacity style={{display:"flex", backgroundColor:'#F0AF23',height:'100%',width:100,minHeight:50,alignSelf:"center", justifyContent:'center', borderRadius: 20}}>
                                <Text style={{alignSelf:"center",fontSize:20,borderRadius:25, justifyContent:"center"}}>siguiente</Text>
                            </TouchableOpacity>
                    </View>
                </View>
                
                <Modal isVisible = {levantada}>
                    
                    <View style={{display:'flex',flexDirection:'column',width:370,height:'40%',backgroundColor:'#FCB826',borderRadius:25,alignItems:'center',justifyContent:'center'}}>
                        <TouchableOpacity onPress={() => setLevantada(!levantada)}>
                            <Image source={fotoCruz} style={{width:30,height:30, position:'relative',left:-165,top:20}}/>
                        </TouchableOpacity>
                        <View style={{height: '100%', marginRight:5}}>
                            <Text style={{color:'black',alignSelf:'center', fontWeight:'bold', fontSize:20}}>AGREGAR INGREDIENTE</Text>
                            <View>
                                <Text style={{color:'black',alignSelf:'center', fontWeight:'bold', fontSize:20}}>NOMBRE</Text>
                                <TextInput style={{width:"98%", height:40, backgroundColor:'white',borderRadius:20,borderWidth:2, alignSelf:'center', marginBottom: 20}}></TextInput>
                                <View style={{display:'flex', flexDirection:'row',justifyContent:'space-around',marginBottom:10, gap:10}}>
                                    <View style={{display:'flex', flexDirection:'column', width:130}}>
                                        <Text style={{color:'black',alignSelf:'center', fontWeight:'bold', fontSize:20}}>CANTIDAD</Text>
                                        <TextInput style={{width:'100%', height:40, backgroundColor:'white',borderRadius:20,borderWidth:2, alignSelf:'center'}}></TextInput>
                                    </View>
                            
                                    <View style={{display:'flex', flexDirection:'column'}}>
                                        <Text style={{color:'black',alignSelf:'center', fontWeight:'bold', fontSize:20}}>UNIDAD</Text>
                                        <TextInput style={{width:90, height:40, backgroundColor:'white',borderRadius:20,borderWidth:2, alignSelf:'center'}}></TextInput>    
                                    </View>
                                </View>
                                <TouchableOpacity style={{display:"flex", backgroundColor:'white',height:5,width:120,minHeight:50,alignSelf:"center", position:'absolute', bottom:-100, borderRadius: 20,marginBottom:10 ,borderWidth:2}}>
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