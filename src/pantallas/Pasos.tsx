import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import PantallaTipoHome from "../componentes/PantallaTipoHome";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Paso, TipoParametros, localip } from "../App";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useState } from "react";
import Modal from "react-native-modal/dist/modal";
type PasosRouteProps= RouteProp<TipoParametros, "Pasos">;
import VideoPlayer from 'react-native-video-controls';


export default function Pasos(props:PasosRouteProps): JSX.Element{
    const route=useRoute<PasosRouteProps>();

    const urlBase="http://"+localip+":8080/api/rest/morfar";
    const urlPasos=urlBase+"/getPasos/"+route.params.idReceta;
    const [listasPasos,setListaPasos]=useState<Paso[]>();
    const [pasoActual,setPasoActual]=useState<Paso>();
    const [loaded,setLoaded]=useState(false);
    const [mostrandoVideo,setMostrandoVideo]=useState(false);
    const [indice,setIndice]=useState(0);
    const [currentVideo, setCurrentVideo] = useState("");

    const fetchPasos = async () => {
        try{
            const response=await fetch(urlPasos);
            const data=await response.json();
            setListaPasos(data);
            console.log(data);
            setPasoActual(data[0]);
            console.log()
            setLoaded(true);
        }
        catch(error){
            console.log("Error en el fetch de los pasos de la receta "+error);
        }
    }

    const fotoMultimedia = () : JSX.Element => {
        console.log(pasoActual);
        console.log(pasoActual?.multimedia);
        if(typeof pasoActual!="undefined"){
            console.log("1");
            if(pasoActual.multimedia!=null){
                console.log("entro");
                if(pasoActual.multimedia.tipo_contenido=="foto"){
                    console.log("foto");
                    console.log(pasoActual?.multimedia.urlContenido);
                    return(
                        <Image style={{position:'absolute', bottom: 160 , width:350,height:350,borderWidth:2,borderRadius:45}} source={{uri:pasoActual.multimedia.urlContenido}}/> 
                    );
                }        
                else{
                    return (
                        <TouchableOpacity onPress={()=>{
                            if(pasoActual.multimedia!=null){
                            setCurrentVideo(pasoActual?.multimedia?.urlContenido);
                            setMostrandoVideo(!mostrandoVideo);
                        }

                        }}><Text> Ir a video</Text></TouchableOpacity>
                    );
                }
            }
            return <View><Text>No hay multimedia para mostrar</Text></View>
        }


        return <View><Text>No se encontró multimedia para este paso.</Text></View>
    }
    const siguientePaso= () => {
        if(listasPasos!=undefined){
            if(listasPasos.length>indice+1){
                setPasoActual(listasPasos[indice+1]);
                setIndice(indice+1);
            }
            else{
                setPasoActual(listasPasos[0]);
                setIndice(0);
            }
        }
    }

    if(loaded){
        return(
            <PantallaTipoHome contenido={
                <View>
                    <Modal isVisible={mostrandoVideo}>
                        {(currentVideo != "") ? 
                        <VideoPlayer onBack = {()=> setMostrandoVideo(!mostrandoVideo)} source={{uri:currentVideo}}/>
                         : <Text> CARGANDO </Text>}
                    </Modal>

                    <View style={{display:'flex',flexDirection:'column',justifyContent:'space-around',alignItems:'center'}}>
                        <Text style={{fontSize:25,color:'black',fontWeight:'bold',marginBottom:10}}>Paso {indice+1}</Text>
                        <ScrollView style={{borderRadius:20,borderColor:'black',borderWidth:2,minWidth:350,minHeight:100,maxHeight:100,marginBottom:10}}>
                            <Text style={{fontSize:20,alignSelf:'center',width:320,color:'black'}}>
                              {pasoActual?.texto} 
                            </Text>
                        </ScrollView>
                        <Text style={{fontSize:18,color:'black',fontWeight:'bold'}}>Multimedia</Text>

                        {fotoMultimedia()}

                        <View style={{backgroundColor:'white',width:'100%', height:50, bottom:0,alignSelf:'center',zIndex:50,marginTop:480}}>
                                <TouchableOpacity onPress={() => siguientePaso()} style={{marginTop:6,display:"flex", backgroundColor:'#F0AF23',height:'100%',width:200,minHeight:50,alignSelf:"center", justifyContent:'center', borderRadius: 20}}>
                                    <Text style={{alignSelf:"center",fontSize:15,borderRadius:25, justifyContent:"center",position:'absolute'}}>Siguiente</Text>
                                </TouchableOpacity>
                        </View>
        
                    </View>
                </View>
            }/>
        )
    }
    else{
        fetchPasos();
        return(<View></View>)
    }
    
}