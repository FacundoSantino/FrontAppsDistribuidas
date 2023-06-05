import { ScrollView, StyleSheet, Text, View } from "react-native";
import PantallaTipoHome from "./PantallaTipoHome";
import estiloApp from "../estilos/estiloApp";
import CarouselCards from "../CarouselCards";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native-elements";
import fotoCruz from '../assets/cruz.png';
import fotoEstrellaLlena from '../assets/estrellaLlena.png';
import fotoEstrellaVacia from '../assets/estrellaVacia.png';
import { useState } from "react";
import { Foto, TipoParametros, localip } from "../App";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React from "react";

//http://localhost:8080/api/rest/morfar/ingredients/1


type RecetaRouteProps= RouteProp<TipoParametros, "Receta">;

export default function Receta(): JSX.Element {

    var p: any[] = [];
    const [fotoEstrella,setFotoEstrella]=useState(fotoEstrellaVacia);
    const urlBase="http://"+localip+":8080/api/rest/morfar";
    const [cargoPantalla,setCargoPantalla]=useState(false);
    const urlFetchIngredientes=urlBase+'/ingredients/';
    const [procesado, setProcesado] = useState<String[]>([]);
    const [ingredientes,setIngredientes]=useState([]);
    const route=useRoute<RecetaRouteProps>();
    const navigation=useNavigation();


    const ingredientesFetch= async () => {
        try{
            const respuesta= await fetch(urlFetchIngredientes+route.params.contenido.idReceta);
            const data = await respuesta.json();
            return data;
        }
        catch(err){
            console.log(err);
        }
    
    }

    React.useEffect( () =>{
        ingredientesFetch().then((data) => setIngredientes(data)).finally(() => {
            console.log(route.params.contenido.fotos);
            if(typeof route.params.contenido != 'undefined' && typeof route.params.pasos != 'undefined'){
                route.params.contenido.fotos.forEach((d: Foto,i:number) => {
                    p.push({
                    "title": "titulo",
                    "body": "body",
                    "imgUrl": d.urlFoto
                    });
                });
                setProcesado(p);
        };
            setCargoPantalla(true);});
    },[]
    )
    function handlePressEstrella() {
        if(fotoEstrella==fotoEstrellaLlena){
            setFotoEstrella(fotoEstrellaVacia);
        }
        else{
            setFotoEstrella(fotoEstrellaLlena);
        }
    }

    function irAComentarios() {
        console.log(route.params.contenido);
    }

    function irAIngredientes() {
        navigation.navigate("Ingredientes" as never,{ingredientes:ingredientes} as never);
    }
    

    if(cargoPantalla){
        

    return(
        <PantallaTipoHome contenido={

            <View style={{display:'flex',flexDirection:'column'}}>
                <View style={[style.flexRow,{justifyContent:"flex-end"}]}>
                    <Image source={fotoCruz}/>
                    <Text onPress={() => {irAComentarios()}}>COMENTARIOS</Text>
                    <Image source={fotoEstrella} onPress={() => {handlePressEstrella()}} style={{width:26,height:26,marginLeft:10}}/>
                </View>
                <Text style={{textAlign:'center',fontWeight:'bold',fontSize:30}}>{route.params.titulo}</Text>

                <View style={style.carouselContainer}>
                    {(procesado.length>0)?<CarouselCards procesado={procesado} />:null}
                </View>

                <Text style={{textAlign:'center',color:'black',fontSize:15}}>Descripcion:</Text>

                <ScrollView contentContainerStyle={{alignItems:'center'}} style={{borderRadius:10,height:"auto",minHeight:10, maxHeight:90, width:390,borderColor:'black',borderWidth:2.3}}>
                    <Text >
                        {route.params.contenido.descripcion}
                    </Text>
                </ScrollView>

                <Text style={{textAlign:'center',color:'black',fontSize:15}}>Pasos:</Text>

                <ScrollView style={{borderRadius:10,minHeight:10,height:"auto", maxHeight:90, width:390,borderColor:'black',borderWidth:2.3}}>

                    {route.params.pasos.map((paso) => (
                        <Text>
                            {paso.nroPaso+". "+paso.texto}
                        </Text>
    ))}

                </ScrollView>
                
                <View style={{backgroundColor:'white',width:'100%', height:30, bottom:0,alignSelf:'center',zIndex:50,marginTop:20,marginBottom:90}}>
                        <TouchableOpacity onPress={() => irAIngredientes()} style={{marginTop:6,display:"flex", backgroundColor:'#F0AF23',height:'100%',width:200,minHeight:50,alignSelf:"center", justifyContent:'center', borderRadius: 20}}>
                            <Text style={{alignSelf:"center",fontSize:15,borderRadius:25, justifyContent:"center"}}>VER INGREDIENTES</Text>
                        </TouchableOpacity>
                </View>
                 
                <View style={{backgroundColor:'white',width:'100%', position:'absolute', height:5, bottom:0,alignSelf:'center',zIndex:80}}>
                        <TouchableOpacity style={{marginTop:6,display:"flex", backgroundColor:'#F0AF23',height:'100%',width:335,minHeight:50,alignSelf:"center", justifyContent:'center', borderRadius: 20}}>
                            <Text style={{alignSelf:"center",fontSize:20,borderRadius:25, justifyContent:"center"}}>AGREGAR A MI LISTA</Text>
                        </TouchableOpacity>
                </View>
            </View>
        }/>
    )
    } //161 W 229W y ambos 41 H
    else{
        return(
            <Text> Cargando... </Text>
        )
    }
}

const style=StyleSheet.create(estiloApp);