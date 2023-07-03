
import React, { useState } from "react";

import {View, Text, StyleSheet,Image,TextInput,SafeAreaView,ScrollView, ActivityIndicator, TouchableOpacity} from "react-native";
import menuHamburguesaIcono from "../assets/menuHamburguesaIcono.png";
import MorfAr from "../assets/MorfAR.png";
import lupa from "../assets/lupa.png";
import LogoSol from "../assets/Logo_Sol_Chico.png";
import estiloApp from "../estilos/estiloApp";
import TarjetaCategoria from "../componentes/TarjetaCategoria";
import fotoMisRecetas from "../assets/mis_recetas.png";
import fotoMiLista from "../assets/mi_lista.png";
import fotoCategorias from "../assets/categorias.png";
import CarouselCards from "../CarouselCards";
import PantallaTipoHome from "../componentes/PantallaTipoHome";
import {RouteProp, createNavigatorFactory, useNavigation, useRoute } from '@react-navigation/native';
import BarraDeBusqueda from "../componentes/BarraDeBusqueda";
import { TipoItem, TipoParametros, localip } from "../App";
import Modal from "react-native-modal";
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import estilosLogin from '../estilos/estiloLogin';
type HomeProps = RouteProp<TipoParametros,'Home'>;
function Home(): JSX.Element{
    var p: any[] = [];
    const [idUser, setIdUser] = useState<String>("");
    const navigation = useNavigation();
    const [dato, setDato] = useState<any[]>([]);
    const [procesado, setProcesado] = useState<String[]>([]);
    const route = useRoute<HomeProps>();
    console.log(route.params.user);
    const urlFetchMisRecetas="http://"+localip+":8080/api/rest/morfar/getMyRecipes/";
    const [userData, setUserData] = useState({});
    const [cargado,setCargado] = useState(false);
    //nombre,password,avatar
    const [nombre,setNombre] = useState("");
    const [password,setPassword] = useState("");
    const [avatar,setAvatar] = useState("");
    const getData = async () =>{
        try{
            const value = await AsyncStorage.getItem('login');
            if (value !== null){
                setIdUser(value);
            }
        } catch(e){
            console.log(e);
        }
    }
    const getHomeData = async () => {
        try {
        const response = await fetch('http://' + localip + ':8080/api/rest/morfar/getHomeCommonInfo');
        const json = await response.json();
        
        return json;
        } catch (err) {
        console.log(err);
        }
    }

    const setuser = async ()=>{
        const id = await AsyncStorage.getItem('user');
        if (id != null){
            console.log("ACA ESTA WACHO");
            console.log(id);
            setIdUser(id);
        }
    }

    React.useEffect(()=>{
        
        setCargado(false);
        handleCarrouselData();
        if(idUser!=""){
            fetch("http://"+localip+":8080/api/rest/morfar/getUsers/"+idUser)
            .then((r) => r.json())
            .then((d) => setUserData(d))
            .finally(()=>
                setCargado(true));
            //NombreDefault
            getData();
        }else{
            setuser();
        }
    },[]);
    
    const handleCarrouselData = async () => {
        
        getHomeData()
        .then(data => {
            data.forEach((d: any) => {
                p.push({
                "title": d.nombre,
                "body": d.descripcion,
                "imgUrl": d.fotos[0].urlFoto
                });
            });
            setProcesado(p);
        })
        .catch(error => console.error(error));
    }

    const recetasFetch= async () => {
        try{
            const respuesta= await fetch(urlFetchMisRecetas+idUser);
            const data = await respuesta.json();
            return data;
        }
        catch(err){
            console.log(err);
        }
    
      }
    
      const handleRecetas = async () =>{
        console.log("Manejando recetas");
        await recetasFetch().then((data)=>{
            if(typeof data=="undefined"){
                navigation.navigate("PantallaReceta" as never, 
                {tipo: TipoItem.RECETA,
                    verIngredientes:false,
                    local:false,
                    permitirEliminacion:true,
                    permitirAgregacion:true,
                    titulo: "Mis recetas",
                    contenido: []
                } as never);
            }
            else{
                navigation.navigate("PantallaReceta" as never, 
                {tipo: TipoItem.RECETA,
                    verIngredientes:false,
                    local:false,
                    permitirEliminacion:true,
                    permitirAgregacion:true,
                    titulo: "Mis recetas",
                    contenido: data
                } as never);
            }
            
                
            }
        );
        
        
      }
    const handleUpdateUser = ()=>{
        var dto = {
            "nickname" : route.params.user,
            "nombre" : nombre,
            "password":password,
            "avatar" : avatar
        }
        fetch("http://"+localip+":8080/api/rest/morfar/updateUserAfterRegister",
        {method:'POST',
    body: JSON.stringify(dto),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
      }}).then((r)=>{
        if (r.status == 200){
            setCargado(false);
        } else{
            setCargado(true);
        }

      })
    }
    return( 
        <PantallaTipoHome contenido={
            <View style={style.flexColumn}>
                <View style = {{paddingLeft:2}}>
                    {(cargado)?
                    <Text style={{alignSelf:'center'}}>¡Bienvenido nuevamente {userData.nombre}!</Text>
                    :null}
                    <BarraDeBusqueda/>
                    <TarjetaCategoria 
                        nombre={"MIS RECETAS"} 
                        onPress={async ()=>handleRecetas()}
                        sourceFoto={fotoMisRecetas} 
                        colorInterno={"#FCB826"} 
                        colorExterno={"#FFFDFD"} 
                        paddingTop={8}
                        paddingBottom={20} 
                        ancho={360}
                        paddingHorizontal={13}
                        />
                    <TarjetaCategoria 
                        nombre={"MI LISTA"} 
                        onPress={() => navigation.navigate("MisGuardadas" as never)
                        } 
                        sourceFoto={fotoMiLista} 
                        colorInterno={"#FCB826"} 
                        colorExterno={"#FFFDFD"} 
                        paddingTop={8}
                        paddingBottom={20}  
                        ancho={360}
                        paddingHorizontal={13}/>

                    <TarjetaCategoria 
                        nombre={"CATEGORIAS"} 
                        onPress={() => navigation.navigate("MisCategorias" as never) } 
                        sourceFoto={fotoCategorias} 
                        colorInterno={"#FCB826"} 
                        colorExterno={"#FFFDFD"} 
                        paddingTop={8}
                        paddingBottom={20}  
                        ancho={360}
                        paddingHorizontal={13}/>
                </View>
                <View style={style.carouselContainer}>
                    {(procesado.length>0)?<CarouselCards procesado={procesado} />:null}
                </View>
                {(cargado && userData.nombre == 'NombreDefault')?
                <Modal
                isVisible ={cargado}>
                <View style={{backgroundColor:'#FCB826', width: '100%',height:500,borderRadius:15}}
                >
                 <Text style={[style.titulo,{alignSelf:'center'}]}> Bienvenido a MorfAR! </Text>
                 <Text style={{alignSelf:'center'}}> Debe completar sus datos para poder acceder a la aplicación. </Text>

                 
                <TextInput style={[loginStyle.inputTextLogin]} value={nombre} placeholder="Ingrese su nombre" onChange={e => setNombre(e.nativeEvent.text)}></TextInput>
                 
                <TextInput style={[loginStyle.inputTextLogin]} value={password} placeholder="Ingrese su nueva contraseña" onChange={e => setPassword(e.nativeEvent.text)}></TextInput>
                 
                <TextInput style={[loginStyle.inputTextLogin,{display:'flex'}]} value={avatar} placeholder="Ingrese su avatar" onChange={e => setAvatar(e.nativeEvent.text)}></TextInput>
                 <TouchableOpacity style={[{alignSelf:'center',position:'absolute',bottom:50}]}
                 onPress={()=>handleUpdateUser()}
                 >
                    <Text style={[{alignSelf:'center',backgroundColor:'white'},{borderRadius:16, padding:10}]}>Guardar</Text>
                 </TouchableOpacity>
                </View>
               </Modal>
                :null}
                
            </View>
        }/>);
    
}


const style=StyleSheet.create(estiloApp);
const loginStyle = StyleSheet.create(estilosLogin);
export default Home;