
import React, { useState } from "react";
import {View, Text, StyleSheet,Image,TextInput,SafeAreaView,ScrollView, Button} from "react-native";
import menuHamburguesaIcono from "../../assets/menuHamburguesaIcono.png";
import MorfAr from "../../assets/MorfAR.png";
import lupa from "../../assets/lupa.png";
import LogoSol from "../../assets/Logo_Sol_Chico.png";
import estiloApp from "../../estilos/estiloApp";
import TarjetaCategoria from "../../componentes/TarjetaCategoria";
import fotoMisRecetas from "../../assets/mis_recetas.png";
import fotoMiLista from "../../assets/mi_lista.png";
import fotoCategorias from "../../assets/categorias.png";
import CarouselCards from "../../CarouselCards";
import { createNavigatorFactory, useNavigation } from '@react-navigation/native';
import BarraDeBusqueda from "../../componentes/BarraDeBusqueda";
import PantallaTipoHome from "../../componentes/PantallaTipoHome";
import { TipoItem, localip } from "../../App";
import Modal from "react-native-modal";
import fotoNombre from '../../assets/comer.png';
import fotoIngrediente from '../../assets/harvest.png';

function MisCategorias(): JSX.Element{
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const urlBase="http://"+localip+":8080/api/rest/morfar";
    const urlFetchUsuarios=urlBase+"/getUsers";
    const urlFetchTodasLasRecetas=urlBase+"/getAllRecipes"
    const [contenidoAMostrar, setContenidoAMostrar]=useState([]);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
      };
    const autoresFetch= async () =>{
        console.log("intentando fetch");
        try{
        const respuesta= await fetch(urlFetchUsuarios);
        const datos = await respuesta.json();
        return datos;

        } catch(err){
        console.log(err);

        }

    }

  const handleAutores = () => {
    console.log("Manejando fetch");
    autoresFetch()
      .then(data => {
            //bien
            navigation.navigate("PantallaReceta" as never, 
                                {tipo: TipoItem.AUTOR,
                                    verIngredientes:false,
                                    permitirEliminacion:false,
                                    permitirAgregacion:false,
                                    titulo: "Recetas por Autor",
                                    contenido: data
                                } as never)
        }
      );
  };

  const recetasFetch= async () => {
    try{
        const respuesta= await fetch(urlFetchTodasLasRecetas);
        const data = await respuesta.json();
        return data;
    }
    catch(err){
        console.log(err);
    }

  }

  const handleRecetas = async () =>{
    console.log("Manejando recetas");
    await recetasFetch().then(
        (data)=>{
            navigation.navigate("PantallaReceta" as never, 
            {tipo: TipoItem.RECETA,
                verIngredientes:false,
                permitirEliminacion:false,
                permitirAgregacion:false,
                titulo: "Todas las Recetas",
                contenido: data
            } as never);
        }
    );
    
    
  }

  const handleTipos= async () =>{
    await tiposFetch().then((data)=>{
        navigation.navigate("PantallaReceta" as never,
        {tipo: TipoItem.TIPO,
            verIngredientes:false,
            permitirEliminacion:false,
            permitirAgregacion:false,
            titulo: "",
            contenido: data
        } as never)
    });
       
  }

  const tiposFetch = async () =>{
    try{
        let url=urlBase+"/getRecipeTypes";
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        return datos;
    }
    catch(error){
        console.log(error);

    }

  }

  const handleIngrediente= () =>{
    ingredienteFetch()
    .then(data=>{
        navigation.navigate("PantallaReceta" as never,
        {tipo: TipoItem.INGREDIENTE,
            verIngredientes:false,
            permitirEliminacion:false,
            permitirAgregacion:false,
            titulo: "Ingredientes",
            contenido: data
        } as never)
    });
  }

  const ingredienteFetch = async () =>{
    try{
        let url= urlBase+"/ingredients";
        const respuesta = await fetch(url);
        const data = await respuesta.json();
        return data;
    }
    catch(error){
        console.log(error);
    }
  }


  const handleNombre= () =>{
    nombresFetch().then(
        (datos) =>{
            
            navigation.navigate("PantallaReceta" as never, {
                tipo: TipoItem.RECETANOMBRE,
                verIngredientes:false,
                permitirEliminacion:false,
                permitirAgregacion:false,
                titulo: "",
                contenido: datos
            } as never)
            
        }
        
    )
  }

  const nombresFetch = async () =>{
    try{
        let url=urlBase+"/getAllRecipeNames";
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        return datos;
    }
    catch(error){
        console.log(error);
        return null;
    }
  }

    return( 
        <PantallaTipoHome contenido={
            <View style={style.flexColumn}>
                        <BarraDeBusqueda/>
                            <TarjetaCategoria 
                                nombre={"TODAS LAS RECETAS"} 
                                onPress={async () => {handleRecetas()} }
                                sourceFoto={fotoMisRecetas} 
                                colorInterno={"#FCB826"} 
                                colorExterno={"#FFFDFD"} 
                                paddingTop={10}
                                paddingBottom={20} 
                                ancho={360}
                                paddingHorizontal={13}
                                />
                            <TarjetaCategoria 
                                nombre={"AUTOR"} 
                                onPress={async () => {handleAutores()}}
                                sourceFoto={fotoMiLista} 
                                colorInterno={"#FCB826"} 
                                colorExterno={"#FFFDFD"} 
                                paddingTop={10}
                                paddingBottom={20}  
                                ancho={360}
                                paddingHorizontal={13}/>
                            <TarjetaCategoria 
                                nombre={"TIPO"} 
                                onPress={() => {handleTipos()}}
                                sourceFoto={fotoCategorias} 
                                colorInterno={"#FCB826"} 
                                colorExterno={"#FFFDFD"} 
                                paddingTop={10}
                                paddingBottom={20}  
                                ancho={360}
                                paddingHorizontal={13}/>


                            <TarjetaCategoria 
                                nombre={"INGREDIENTE"} 
                                onPress={async () =>{handleIngrediente()}  }  
                                sourceFoto={fotoIngrediente} 
                                colorInterno={"#FCB826"} 
                                colorExterno={"#FFFDFD"} 
                                paddingTop={10}
                                paddingBottom={20}  
                                ancho={360}
                                paddingHorizontal={13}/>
                            <Modal 
                            isVisible = {isModalVisible}
                            animationIn="jello"
                            animationInTiming = {4000}
                            >
                                <Text style={{color:'white', alignSelf:'center'}}>
                                    Modal Test
                                </Text>
                                <Button title="CERRAR" onPress={toggleModal}></Button>
                            </Modal>
                            <TarjetaCategoria 
                                nombre={"NOMBRE"} 
                                onPress={async () => {handleNombre()} } 
                                sourceFoto={fotoNombre} 
                                colorInterno={"#FCB826"} 
                                colorExterno={"#FFFDFD"} 
                                paddingTop={10}
                                paddingBottom={20}  
                                ancho={360}
                                paddingHorizontal={13}/>
                            </View>}/>
    )
}


const style=StyleSheet.create(estiloApp);

export default MisCategorias;