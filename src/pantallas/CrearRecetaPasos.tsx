import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert} from "react-native";
import PantallaTipoHome from "../componentes/PantallaTipoHome";
import Modal from "react-native-modal";
import fotoCruz from "../assets/cruz.png";
import React, { useState } from "react";
import CajaPaso from "../componentes/CajaPaso";
import {launchImageLibrary} from 'react-native-image-picker';
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { TipoParametros } from "../App";
import IconoCruz from"../assets/cruz.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type PasoCaja = {
  descripcion:string,
  source:{uri:string,type:string,name:string},
  numeroPaso:number
}

type CrearRecetaPasosRouteProps= RouteProp<TipoParametros, "CrearRecetaPasos">;

export default function CrearRecetaPasos(){
    const navigation=useNavigation();
    const route=useRoute<CrearRecetaPasosRouteProps>();
    const [levantada, setLevantada] = useState(false);
    const[listaPasos,setListaPasos]=useState<PasoCaja[]>([]);
    const [photo,setPhoto]=useState();
    const [sourceFoto,setSourceFoto]=useState<{ uri: string, type: string, name: string }>();
    const [nombrePaso, setNombrePaso] = useState<string>("");
    const [levantadoFaltanCosas,setLevantadoFaltanCosas]=useState(false);
    const [loaded,setLoaded]=useState(false);

    const [identificador,setIdentificador]=useState<number>(0);
    
    const guardarCambio= async ()=>{
      await AsyncStorage.setItem("listaPasos",JSON.stringify(listaPasos));
    }
    
    const agregarPaso = (desc: string) => {
       typeof sourceFoto!="undefined"?listaPasos.push({descripcion:desc,source:sourceFoto,numeroPaso:identificador}):listaPasos.push({descripcion:desc,source:{uri:"",type:"",name:""},numeroPaso:identificador});
       setSourceFoto(undefined);
       setNombrePaso("");
       setIdentificador(identificador+1);
       guardarCambio();
    }

    const selectPhotoTapped = () => {
        launchImageLibrary({
          mediaType: 'mixed',
          includeBase64: false,
          maxHeight: 200,
          maxWidth: 200,
        }, (response) => {

          console.log('Response = ', response);
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (typeof response.errorCode!='undefined') {
            console.log('ImagePicker Error: ', response.errorMessage);
          } else if(typeof response.assets!='undefined') {
            const uri = response.assets[0].uri;
            const type = response.assets[0].type;
            const name = response.assets[0].fileName;
            if(typeof uri!="undefined" && typeof type!="undefined" && typeof name!="undefined"){
            const source = {
              uri,
              type,
              name,
            }
            setSourceFoto(source);
          }
            
          }
        });
      }

      function navegar () {
        if(listaPasos.length<1){
          setLevantadoFaltanCosas(true);
        }
        else {
          navigation.navigate("CrearRecetaIngredientes" as never,{crearRecetaProps:route.params,listaPasos:listaPasos});
        }
      }

      const chequearAlmacenamiento= async () => {
        const listaSinProcesar=await AsyncStorage.getItem("listaPasos");
        if(listaSinProcesar!=null){
          setListaPasos(JSON.parse(listaSinProcesar));
        }
      }

    if(!loaded){
      chequearAlmacenamiento().finally(() => setLoaded(true));
    }
    if(loaded){
      return(
          <PantallaTipoHome contenido={
              <View style={{display:'flex',flexDirection:'column',justifyContent:'space-around',alignContent:'center'}}>
                  <Modal isVisible={levantadoFaltanCosas}>
                      <View style={{display:'flex',flexDirection:'column',width:370,height:200,backgroundColor:'#FCB826',borderRadius:20}}>
                      <TouchableOpacity onPress={() => setLevantadoFaltanCosas(false)} style={{display:'flex',justifyContent:'center',alignItems:'flex-start',height:30,width:340}}>
                          <Image source={IconoCruz} style={{width:20,height:20,marginLeft:10}}/>
                      </TouchableOpacity>
                      <View style={{display:'flex',flexDirection:'column',width:370,height:150,justifyContent:'center',alignItems:'center'}}>
                          <Text style={{fontSize:20,color:'black'}}>Faltan cosas!</Text>
                          <Text style={{fontSize:16,color:'black',width:300,textAlign:'center'}}>Tenés que agregar mínimo 1 paso</Text>
                      </View>
                      </View>
                  </Modal>
                  <Text style={{color:"#808080", fontSize:12,alignSelf:"flex-end"}}>2/4</Text>
                  <Text style={{fontWeight:'bold',fontSize:40,color:'black',textAlign:'center',marginBottom:30}}>Pasos</Text>
                  
                  <TouchableOpacity onPress={() => {setLevantada(true)}} style={{borderWidth:2,display:"flex", backgroundColor:'#F0AF23',height:50,width:200,minHeight:50,alignSelf:"center", justifyContent:'center',marginBottom:30, borderRadius: 20}}>
                      <Text style={{alignSelf:"center",fontSize:20,borderRadius:25, justifyContent:"center"}}>Agregar Paso</Text>
                  </TouchableOpacity>
                  
                  <ScrollView contentContainerStyle={{alignItems:'center'}}  style={{borderWidth:2,borderColor:'black',borderRadius:20,height:500 ,width:350,alignSelf:'center',marginBottom:20}}>
                      {listaPasos.map((item,i) => (<CajaPaso key={i} onPress={() => {setListaPasos(listaPasos.filter((itemb) => item.numeroPaso!=itemb.numeroPaso));guardarCambio();}} numeroPaso={i+1} descripcion={item.descripcion} />))}
                  </ScrollView>
                  
                  
                  <TouchableOpacity onPress={() => navegar()} style={{borderWidth:2,display:"flex", backgroundColor:'#F0AF23',height:50,width:200,minHeight:50,alignSelf:"center", justifyContent:'center',marginBottom:30, borderRadius: 20}}>
                      <Text style={{alignSelf:"center",fontSize:20,borderRadius:25, justifyContent:"center"}}>Siguiente</Text>
                  </TouchableOpacity>

                  <Modal isVisible = {levantada}>
                      
                      <View style={{display:'flex',flexDirection:'column',width:370,height:400,backgroundColor:'#FCB826',borderRadius:20,alignItems:'center',justifyContent:'space-around'}}>
                          <TouchableOpacity onPress={() => setLevantada(false)}>
                              <Image source={fotoCruz} style={{width:30,height:30, position:'absolute',left:-180,top:0}}/>
                          </TouchableOpacity>
                          <Text style={{fontWeight:'bold',fontSize:15, color:'black'}}> Crear Paso</Text>
                          <ScrollView contentContainerStyle={{alignItems:'center'}}  style={{borderWidth:2,marginTop:5,borderColor:'black',borderRadius:20,width:300,height: 120,alignSelf:'center',backgroundColor:'white',marginBottom:10}}>
                              <TextInput textAlignVertical={"top"}
                                  textBreakStrategy={"highQuality"}
                                  underlineColorAndroid={"transparent"}
                                  value={nombrePaso}
                                  onChangeText={text => setNombrePaso(text)}
                                  autoCorrect={false} multiline={true} style={{flex: 1,
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  paddingHorizontal: 5,
                                  marginTop: 10,
                                  flexWrap: "wrap",height:120 ,width:300, textAlign:"left"}}></TextInput>
                          </ScrollView>
                          <TouchableOpacity onPress={selectPhotoTapped} style={{borderWidth:2,display:"flex", backgroundColor:'white',height:'7%',width:190,minHeight:50,alignSelf:"center", justifyContent:'center', borderRadius: 20,marginBottom:10}}>
                              <Text style={{alignSelf:"center",fontSize:17,borderRadius:25, justifyContent:"center"}}>Agregar multimedia</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => {
                            if(nombrePaso!=""){
                              agregarPaso(nombrePaso);
                              setLevantada(false);
                            }
                          }} style={{display:"flex", backgroundColor:'#F0AF23',height:7,width:120,minHeight:50,alignSelf:"center", justifyContent:'center', borderRadius: 20,marginBottom:10 ,borderWidth:2}}>
                              <Text style={{alignSelf:"center",fontSize:17,borderRadius:25, justifyContent:"center"}}>Agregar</Text>
                          </TouchableOpacity>
                      </View>
                  </Modal>
              </View> 
              
          }/>
          
      )
    }
    else{
      return(<View></View>)
    }

}