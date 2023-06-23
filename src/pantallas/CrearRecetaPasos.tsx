import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert} from "react-native";
import PantallaTipoHome from "../componentes/PantallaTipoHome";
import Modal from "react-native-modal";
import fotoCruz from "../assets/cruz.png";
import React, { useState } from "react";
import CajaPaso from "../componentes/CajaPaso";
import {launchImageLibrary} from 'react-native-image-picker';
import { useNavigation } from "@react-navigation/native";

type PasoCaja = {
  descripcion:string,
  source:{uri:string,type:string,name:string},
  numeroPaso:number
}

export default function CrearRecetaPasos(){
    const navigation=useNavigation();
    const [levantada, setLevantada] = useState(false);
    const[listaPasos,setListaPasos]=useState<PasoCaja[]>([]);
    const [photo,setPhoto]=useState();
    const [sourceFoto,setSourceFoto]=useState<{ uri: string, type: string, name: string }>();
    const [nombrePaso, setNombrePaso] = useState<string>("");
    let identificador=0;
    const agregarPaso = (desc: string) => {
       typeof sourceFoto!="undefined"?listaPasos.push({descripcion:desc,source:sourceFoto,numeroPaso:identificador}):listaPasos.push({descripcion:desc,source:{uri:"",type:"",name:""},numeroPaso:identificador});
       identificador++; 
    }

    const cloudinaryUpload = (photo : any) => {
      const data = new FormData()
      data.append('file', photo)
      data.append('upload_preset', 'distribuidasapp')
      data.append("cloud_name", "dyqoli0xg")
      fetch("https://api.cloudinary.com/v1_1/dyqoli0xg/image/upload", {
        method: "post",
        body: data
      }).then(res => res.json()).
        then(data => {
          setPhoto(data.secure_url)
        }).catch(err => {
          Alert.alert("An Error Occured While Uploading")
        })
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
    
    return(
        <PantallaTipoHome contenido={
            <View style={{display:'flex',flexDirection:'column',justifyContent:'space-around',alignContent:'center'}}>
                <Text style={{color:"#808080", fontSize:12,alignSelf:"flex-end"}}>2/4</Text>
                <Text style={{fontWeight:'bold',fontSize:40,color:'black',textAlign:'center',marginBottom:30}}>Pasos</Text>
                
                <TouchableOpacity onPress={() => {setLevantada(true)}} style={{borderWidth:2,display:"flex", backgroundColor:'#F0AF23',height:50,width:200,minHeight:50,alignSelf:"center", justifyContent:'center',marginBottom:30, borderRadius: 20}}>
                    <Text style={{alignSelf:"center",fontSize:20,borderRadius:25, justifyContent:"center"}}>Agregar Paso</Text>
                </TouchableOpacity>
                
                <ScrollView contentContainerStyle={{alignItems:'center'}}  style={{borderWidth:2,borderColor:'black',borderRadius:20,height:500 ,width:350,alignSelf:'center',marginBottom:20}}>
                    {listaPasos.map((item,i) => (<CajaPaso key={i} onPress={() => {setListaPasos(listaPasos.filter((itemb) => item.numeroPaso!=itemb.numeroPaso))}} numeroPaso={i+1} descripcion={item.descripcion} />))}
                </ScrollView>
                
                
                <TouchableOpacity onPress={() => navigation.navigate("CrearRecetaIngredientes" as never)} style={{borderWidth:2,display:"flex", backgroundColor:'#F0AF23',height:50,width:200,minHeight:50,alignSelf:"center", justifyContent:'center',marginBottom:30, borderRadius: 20}}>
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
                          agregarPaso(nombrePaso);
                          setLevantada(false);
                        }} style={{display:"flex", backgroundColor:'#F0AF23',height:7,width:120,minHeight:50,alignSelf:"center", justifyContent:'center', borderRadius: 20,marginBottom:10 ,borderWidth:2}}>
                            <Text style={{alignSelf:"center",fontSize:17,borderRadius:25, justifyContent:"center"}}>Agregar</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View> 
            
        }/>
        
    )

}