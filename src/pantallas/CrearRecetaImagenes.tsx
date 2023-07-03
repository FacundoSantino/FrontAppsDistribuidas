import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import PantallaTipoHome from "../componentes/PantallaTipoHome";
import { useState } from "react";
import { launchImageLibrary } from "react-native-image-picker";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import CajaFoto from "../componentes/CajaFoto";
import { TipoParametros, localip } from "../App";
import IconoCruz from"../assets/cruz.png";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CrearRecetaImagenesRouteProps= RouteProp<TipoParametros, "CrearRecetaImagenes">;

export default function CrearRecetaImagenes() {
    const route=useRoute<CrearRecetaImagenesRouteProps>();
    const [listaFotos,setListaFotos]=useState<{foto:{ uri: string, type: string, name: string },identificador:number}[]>([]);
    const [contador,setContador]=useState<number>(0);
    const [levantadoFaltanCosas,setLevantadoFaltanCosas]=useState(false);
    const [listaPasosFormateada,setListaPasosFormateada]=useState<{nroPaso:number,multimedia:{tipo_contenido:string,extension:string,urlContenido:string},texto:string}[]>([]);
    const [idUsuario,setIdUsuario]=useState<number>();
    const [listaIngredientesFormateada,setListaIngredientesFormateada]=useState<{idIngrediente:number,cantidad:number,idUnidad:number,observaciones:string}[]>([])
    const [listaFotosRecetasProcesada,setListaFotosRecetasProcesada]=useState<{urlFoto:string,extension:string}[]>([]);
    const urlBase="http://"+localip+":8080/api/rest/morfar";
    const urlPostReceta=urlBase+"/createRecipe";
    const [loaded,setLoaded]=useState(false);


    const navigation=useNavigation();

    const guardarLocal= async () => {
      await AsyncStorage.setItem("listaFotosReceta",JSON.stringify(listaFotos));
    }

    const chequearLocal= async () => {
      const response=await AsyncStorage.getItem("listaFotosReceta");
      if(response!=null){
        const data=JSON.parse(response);
        setListaFotos(await data);
      }
    }

    const prepararLista= async() => {

      //ingredientes
      console.log("INGREDIENTES BRO ///////////////////////////////////////////////////////////")
      console.log(route.params.listaIngredientes);
      await route.params.listaIngredientes.forEach(async (item,i) => {
        await listaIngredientesFormateada.push({idIngrediente:item.idIngrediente,cantidad:item.cantidad,idUnidad:item.idUnidad,observaciones:""})
      })
      console.log("Devolviendo true de prepararLista");
      return true;
    }

    const subirFotos = async () => {
      try {
        console.log("LISTA PASOS");
        console.log(route.params.listaPasos);
        console.log("LISTA FOTOS");
        console.log(listaFotos);
    
        const promesasPasos = route.params.listaPasos.map(async (item, i) => {
          const source = item.source;
          const descripcion = item.descripcion;
          const data = await cloudinaryUpload(source);
          console.log("FOTO RECIBIDA");
          console.log(data.secure_url);
          await listaPasosFormateada.push({
            nroPaso: i + 1,
            multimedia: {
              tipo_contenido: source.type.split("/")[0] === "image" ? "foto" : "video",
              extension: source.type.split("/")[1],
              urlContenido: data.secure_url
            },
            texto: descripcion
          });
          console.log("pushee algo 1");
        });
    
        const promesasFotos = listaFotos.map(async (item, i) => {
          const data = await cloudinaryUpload(item.foto);
          console.log("FOTO RECIBIDA");
          console.log(data.secure_url);
          await listaFotosRecetasProcesada.push({
            urlFoto: data.secure_url,
            extension: item.foto.type.split("/")[1]
          });
          console.log("pushee algo 2");
        });
    
        await Promise.all([...promesasPasos, ...promesasFotos]);
      } catch (error) {
        console.log("Error en subirFotos:", error);
      }
    };

    const postReceta= async () => {
      try {
        
        const idUsuariop=await AsyncStorage.getItem("idUsuario");
        console.log("Dale bro subite");
        console.log(await listaPasosFormateada);
        console.log("DATOS SUBIDA");
        console.log({
          "idUsuario":await idUsuariop,
          "nombre":route.params.crearRecetaProps.nombreReceta,
          "descripcion":route.params.crearRecetaProps.descripcionReceta,
          "comensales":route.params.crearRecetaProps.comensales,
          "porciones":route.params.crearRecetaProps.porciones,
          "pasos": await listaPasosFormateada,
          "ingredientes":listaIngredientesFormateada,
          "fotos":listaFotosRecetasProcesada,
          "idTipo":route.params.crearRecetaProps.idTipoReceta
        });
        
        console.log("MULTIMEDIA");
        console.log(listaPasosFormateada);
        const response = await fetch(urlPostReceta,{
          method:"POST",
          body:JSON.stringify(
            {
              "idUsuario":await idUsuariop,
              "nombre":route.params.crearRecetaProps.nombreReceta,
              "descripcion":route.params.crearRecetaProps.descripcionReceta,
              "comensales":route.params.crearRecetaProps.comensales,
              "porciones":route.params.crearRecetaProps.porciones,
              "pasos":listaPasosFormateada,
              "ingredientes":listaIngredientesFormateada,
              "fotos":listaFotosRecetasProcesada,
              "idTipo":route.params.crearRecetaProps.idTipoReceta
            }
          ),
          headers:{
            "Content-Type":"application/json; charset=UTF-8"
          }
        })
        if((await response).status==400){
          throw new Error("Salió mal el post de la Receta")
        }
      }
      catch(error){
        console.log("Error post receta: "+error);
      }
      finally{
        return true;
      }
    }

    const reseteoLocales = async () => {
      //await AsyncStorage.multiRemove(["nombreReceta","descripcionReceta","comensales","porciones","idTipoReceta","listaPasos","listaIngredientes","listaImagens"])
    }

    const subirReceta = async () => {
                  // console.log(route.params.listaPasos);
      // await subirFotos()
      // .finally(async ()=>{
      //   console.log("ACA VAN ALS LISTAS PROCESADAS");
      //   console.log(await listaPasosFormateada);
      //   console.log(await listaFotosRecetasProcesada);
      // });
      if (listaFotos.length < 1) {
        await AsyncStorage.getItem('user').then(data => console.log(data));
        setLevantadoFaltanCosas(true);
      } else {
        try {
          await subirFotos();
    
          console.log("ANTES DE SUBIR FOTOS");
          console.log(await listaPasosFormateada);
    
          const promesasPasos = route.params.listaPasos.map(async (item, i) => {
            const source = item.source;
            const descripcion = item.descripcion;
            const data = await cloudinaryUpload(source);
            console.log("FOTO RECIBIDA");
            console.log(data.secure_url);
            await listaPasosFormateada.push({
              nroPaso: i + 1,
              multimedia: {
                tipo_contenido: source.type.split("/")[0] === "image" ? "foto" : "video",
                extension: source.type.split("/")[1],
                urlContenido: data.secure_url
              },
              texto: descripcion
            });
            console.log("pushee algo 1");
          });
    
          await Promise.all([...promesasPasos]);
    
          console.log("ANTES DE prepararLista");
          const respuestaBool = await prepararLista();
          if (respuestaBool) {
            console.log("ANTES DE postReceta");
            console.log(await listaPasosFormateada);
    
            await new Promise(resolve => setTimeout(resolve, route.params.listaPasos.length * 6000));
    
            const posteada = await postReceta();
            if (posteada) {
              console.log("ANTES DE reseteoLocales");
              console.log(await listaPasosFormateada);
    
              await reseteoLocales();

            }
          }
        } catch (error) {
          console.log("Error en subirReceta:", error);
        }
        finally{
          navigation.navigate("Home" as never);
        }
      }
    };
    
    
    
    const cloudinaryUpload = async (photo : any) => {
        const data = new FormData()
        data.append('file', photo)
        data.append('upload_preset', 'distribuidasapp')
        data.append("cloud_name", "dyqoli0xg")
        const respuesta = await fetch("https://api.cloudinary.com/v1_1/dyqoli0xg/auto/upload", {
        method: "post",
        body: data
        });
        const datos = await respuesta.json();
        return datos;
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
            guardarLocal();
          }
            
          }
        });
      }


      if(!loaded){
        chequearLocal().then(() => setLoaded(true));
      }
    
    if(loaded){
    return(
        <PantallaTipoHome contenido={
            <View>
                <Modal isVisible={levantadoFaltanCosas}>
                    <View style={{display:'flex',flexDirection:'column',width:370,height:200,backgroundColor:'#FCB826',borderRadius:20}}>
                    <TouchableOpacity onPress={() => setLevantadoFaltanCosas(false)} style={{display:'flex',justifyContent:'center',alignItems:'flex-start',height:30,width:340}}>
                        <Image source={IconoCruz} style={{width:20,height:20,marginLeft:10}}/>
                    </TouchableOpacity>
                    <View style={{display:'flex',flexDirection:'column',width:370,height:150,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:20,color:'black'}}>Faltan cosas!</Text>
                        <Text style={{fontSize:16,color:'black',width:300,textAlign:'center'}}>Tenés que agregar mínimo 1 imágen</Text>
                    </View>
                    </View>
                </Modal>
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

                <TouchableOpacity onPress={async () => await subirReceta()} style={{borderWidth:2,display:"flex", backgroundColor:'#F0AF23',height:50,width:200,minHeight:50,alignSelf:"center", justifyContent:'center',marginBottom:30, borderRadius: 20}}>
                    <Text style={{alignSelf:"center",fontSize:20,borderRadius:25, justifyContent:"center"}}>Finalizar</Text>
                </TouchableOpacity>


                
            </View>
        }
        />
    )
      }
      else{
        return(<View></View>)
      }
}