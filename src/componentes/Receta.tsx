import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import PantallaTipoHome from "./PantallaTipoHome";
import estiloApp from "../estilos/estiloApp";
import CarouselCards from "../CarouselCards";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native-elements";
import fotoCruz from '../assets/cruz.png';
import fotoEstrellaLlena from '../assets/estrellaLlena.png';
import fotoEstrellaVacia from '../assets/estrellaVacia.png';
import { useState } from "react";
import { Foto, TipoParametros, localip } from "../App";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import Modal from "react-native-modal";
import Lupa from '../assets/lupa.png';
import IconoCruz from '../assets/cruz.png';
import { useAsyncStorage } from "@react-native-async-storage/async-storage";


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
    const [levantada, setLevantada] = useState(false);
    const [enviada, setEnviada] = useState(false);
    const [favorita,setFavorita]=useState(false);
    const route=useRoute<RecetaRouteProps>();
    const navigation=useNavigation();
    const [valoracion,setValoracion] = useState(0);
    const [contador ,setContador] = useState(valoracion);
    const [estrellas, setEstrellas] = useState<Object[]>([]);
    const urlEsFavorita=urlBase+"/esFavorita";
    const urlAgregarFavorita=urlBase+"/addFavRecipe";
    const urlBorrarFavorita=urlBase+"/borrarFavorita";

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
        ingredientesFetch().then((data) => setIngredientes(data)).then( async () => {
            console.log("HOLAHOLAHOLA");
            try{
                console.log("URL FETCH "+ urlEsFavorita+"/"+route.params.contenido.idReceta+"/"+await useAsyncStorage("idUsuario").getItem())
                const response= await fetch(urlEsFavorita+"/"+route.params.contenido.idReceta+"/"+await useAsyncStorage("idUsuario").getItem());
                if(response.status==200){
                    console.log("LA ESTRELLA DEBERIA ESTAR LLENA");
                    setFotoEstrella(fotoEstrellaLlena);
                    setFavorita(true);
                }
                
            }
            catch(error){
                console.log(error);
            }
        }).finally(() => {
            console.log(route.params.contenido.fotos);
            if(typeof route.params.contenido != 'undefined' && typeof route.params.pasos != 'undefined'){
                route.params.contenido.fotos.forEach((d: Foto,i:number) => {
                    p.push({
                    "title": "",
                    "body": "",
                    "imgUrl": d.urlFoto,
                    key:i
                    });
                });
                setProcesado(p);
                let lista = [
                    <Image source={fotoEstrellaLlena} style={{width:25,height:25}}/>,
                    <Image source={fotoEstrellaLlena} style={{width:25,height:25}}/>,
                    <Image source={fotoEstrellaLlena} style={{width:25,height:25}}/>,
                    <Image source={fotoEstrellaLlena} style={{width:25,height:25}}/>,
                    <Image source={fotoEstrellaLlena} style={{width:25,height:25}}/>
                ];
                setEstrellas(lista);
        };
            setCargoPantalla(true);});
    },[]
    )

    const fetchEliminarFavorito = async () => {
        try{
            await fetch(urlBorrarFavorita+"/"+route.params.contenido.idReceta+"/"+await useAsyncStorage("idUsuario").getItem(),{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json; charset=UTF-8"
                }
            })
        }
        catch(error){
            console.log(error);
        }
    }
    const fetchAgregarFavorito = async () => {
        try{
            await fetch(urlAgregarFavorita,{
                body: JSON.stringify( {
                    "idUser":await useAsyncStorage("idUsuario").getItem(),
                    "idRecipe": route.params.contenido.idReceta
                }),
                method:"POST",
                headers:{
                    "Content-Type":"application/json; charset=UTF-8"
                }
            })
        }
        catch(error){
            console.log(error);
        }
    }

    const handlePressEstrella = () => {
        if(favorita){
            fetchEliminarFavorito().finally(() => {setFavorita(false);setFotoEstrella(fotoEstrellaVacia)});
        }
        else{
            fetchAgregarFavorito().finally(() => {setFavorita(true);setFotoEstrella(fotoEstrellaLlena)});
        }
    }

    const levantarEnviar = ()=> {
        setLevantada(!levantada);
        setEnviada(enviada);
    }

    function irAComentarios() {
        navigation.navigate("Comentarios" as never,{idReceta:route.params.contenido.idReceta} as never);
    }

    function irAIngredientes() {
        navigation.navigate("Ingredientes" as never,{ingredientes:ingredientes,idReceta:route.params.contenido.idReceta,nombreReceta:route.params.contenido.nombre} as never);
    }
    
    function irAPasos(): void {
        navigation.navigate("Pasos" as never,{idReceta:route.params.contenido.idReceta} as never);
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

                <ScrollView contentContainerStyle={{alignItems:'center'}} style={{marginBottom:100,borderRadius:10,height:"auto",minHeight:50, maxHeight:100, width:390,borderColor:'black',borderWidth:2.3}}>
                    <Text >
                        {route.params.contenido.descripcion}
                    </Text>
                </ScrollView>
                
                <View style={{backgroundColor:'white',width:'100%', height:30, bottom:0,alignSelf:'center',zIndex:50,marginTop:20,marginBottom:50}}>
                        <TouchableOpacity onPress={() => irAPasos()} style={{marginTop:6,display:"flex", backgroundColor:'#F0AF23',height:'100%',width:300,minHeight:50,alignSelf:"center", justifyContent:'center', borderRadius: 20}}>
                            <Text style={{alignSelf:"center",fontSize:25,borderRadius:25, justifyContent:"center"}}>Ver pasos</Text>
                        </TouchableOpacity>
                </View>
                <View style={{backgroundColor:'white',width:"100%", height:30, bottom:0,alignSelf:'center',zIndex:50,marginTop:20,marginBottom:90}}>
                        <TouchableOpacity onPress={() => irAIngredientes()} style={{marginTop:6,display:"flex", backgroundColor:'#F0AF23',height:'100%',width:300,minHeight:50,alignSelf:"center", justifyContent:'center', borderRadius: 20}}>
                            <Text style={{alignSelf:"center",fontSize:25,borderRadius:25, justifyContent:"center"}}>Ver ingredientes</Text>
                        </TouchableOpacity>
                </View>
                
                <Modal isVisible = {levantada}>
                    <TouchableOpacity onPress={() => setLevantada(!levantada)} style={{display:'flex',justifyContent:'center',alignItems:'flex-start',height:30,width:340}}>
                        <Image source={IconoCruz} style={{width:20,height:20,marginLeft:10,marginTop:30}}/>
                    </TouchableOpacity>
                    <View style={{display:'flex',flexDirection:'column',width:370,height:300,backgroundColor:'#FCB826',borderRadius:20,alignItems:'center',justifyContent:'space-around'}}>
                        <TouchableOpacity onPress={()=>setLevantada(!levantada)} style={{display:'flex',justifyContent:'center',alignItems:'flex-start',height:30,width:340}}>
                            <Image source={IconoCruz} style={{width:20,height:20,marginLeft:10}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{console.log("hola")}} style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',height:30,width:340}}>
                        {estrellas.map((estrella, index) => {
                            if (contador > 0) {
                            setContador(contador - 1);
                            return (
                                <Image key={index} source={fotoEstrellaLlena} style={{ width: 25, height: 25 }} />
                            );
                            } else {
                            return (
                                <Image key={index} source={fotoEstrellaVacia} style={{ width: 25, height: 25 }} />
                            );
                            }
                        })}
                            
                        </TouchableOpacity>
                        <Text style={{textAlign:'center',fontWeight:'bold', fontSize:17}}>Valora la receta!</Text>

                        <ScrollView style={{borderRadius:10,minHeight:10,height:100,backgroundColor:'white', maxHeight:130, width:350,borderColor:'black',borderWidth:2.3}}>
                        <TextInput >

                        </TextInput>
                        </ScrollView>
                        <TouchableOpacity onPress={() => {setLevantada(!levantada); setEnviada(!enviada); }} style={{marginTop:3,display:"flex", backgroundColor:'white',width:100,alignSelf:"center", justifyContent:'center', borderRadius: 20,height:35}}>
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