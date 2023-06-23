import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import PantallaTipoHome from "../componentes/PantallaTipoHome";
import { useState } from "react";
import { launchImageLibrary } from "react-native-image-picker";
import { useNavigation } from "@react-navigation/native";
import CajaFoto from "../componentes/CajaFoto";


export default function CrearRecetaImagenes() {
    const [photo,setPhoto]=useState();
    const [listaFotos,setListaFotos]=useState<{foto:{ uri: string, type: string, name: string },identificador:number}[]>([]);
    const [contador,setContador]=useState<number>(0);

    const navigation=useNavigation();

    const subirReceta = () => {
        console.log("programar el post");
        navigation.reset;
        navigation.navigate("Home" as never);
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
          mediaType: 'photo',
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
            const numero=contador;
            listaFotos.push({foto:source,identificador:numero});
            setContador(contador+1);
          }
            
          }
        });
      }



    return(
        <PantallaTipoHome contenido={
            <View>
                <Text style={{color:"#808080", fontSize:12,alignSelf:"flex-end"}}>4/4</Text>
                <Text style={{fontWeight:'bold',fontSize:40,color:'black',textAlign:'center',marginBottom:30}}>Imagenes</Text>
                <TouchableOpacity onPress={() => selectPhotoTapped()} style={{borderWidth:2,display:"flex", backgroundColor:'#F0AF23',height:50,width:200,minHeight:50,alignSelf:"center", justifyContent:'center',marginBottom:30, borderRadius: 20}}>
                        <Text style={{alignSelf:"center",fontSize:20,borderRadius:25, justifyContent:"center"}}>Agregar imagen</Text>
                </TouchableOpacity>
                <ScrollView contentContainerStyle={{alignItems:'center'}}  style={{borderWidth:2,borderColor:'black',borderRadius:20,height:500 ,width:350,alignSelf:'center',marginBottom:20}}>
                    {listaFotos.map((item,i) => (
                        <CajaFoto urlFoto={item.foto.uri} descripcion={item.foto.name+item.foto.type.split("/")[1]} onPress={() => {setListaFotos(listaFotos.filter((itemb) => item.identificador!=itemb.identificador))}}  key={i}/>
                    ))}
                </ScrollView>

                <TouchableOpacity onPress={() => subirReceta()} style={{borderWidth:2,display:"flex", backgroundColor:'#F0AF23',height:50,width:200,minHeight:50,alignSelf:"center", justifyContent:'center',marginBottom:30, borderRadius: 20}}>
                    <Text style={{alignSelf:"center",fontSize:20,borderRadius:25, justifyContent:"center"}}>Finalizar</Text>
                </TouchableOpacity>


                
            </View>
        }
        />
    )
}