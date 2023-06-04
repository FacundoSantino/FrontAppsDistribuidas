
import React, { useState } from "react";
import {View, Text, StyleSheet,Image,TextInput,SafeAreaView,ScrollView} from "react-native";
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


function MisCategorias(): JSX.Element{
    const navigation = useNavigation();

const urlBase="http://"+localip+":8080/api/rest/morfar";
const urlFetchUsuarios=urlBase+"/getUsers";
const urlFetchTodasLasRecetas=urlBase+"/getAllRecipes"
const [contenidoAMostrar, setContenidoAMostrar]=useState([]);

const autoresFetch= async () =>{
    console.log("intentando fetch");
    try{
      const respuesta= await fetch(urlFetchUsuarios, {     
        method: 'GET',
      }).then((data) => {return data.json();});

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
                                {tipo: TipoItem.TIPO,
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

  }

  const ingredienteFetch = async () =>{
    try{
        let url= urlBase+"/getIngredients";
        await fetch(url,{
            method:"GET"
        }).then((data) => {return data.json();});
    }
    catch(error){
        console.log(error);
    }
  }


  const handleNombre= () =>{
    tiposFetch().then(
        (datos) =>{
            if(datos==0){
                navigation.navigate("PantallaReceta" as never, {
                    
                } as never)
            }
            else{
                console.log("El fetch de nombres salio mal");
            }
        }
        
    )
  }

  const nombresFetch = async () =>{
    try{
        let url=urlBase+"";
        return await fetch(url,{
            method:"GET"
        }).then(data => data.json());
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
                                paddingBottom={24} 
                                ancho={360}
                                paddingHorizontal={13}
                                />
                            <TarjetaCategoria 
                                nombre={"AUTOR"} 
                                onPress={() => {handleAutores()}}
                                sourceFoto={fotoMiLista} 
                                colorInterno={"#FCB826"} 
                                colorExterno={"#FFFDFD"} 
                                paddingTop={10}
                                paddingBottom={24}  
                                ancho={360}
                                paddingHorizontal={13}/>
                            <TarjetaCategoria 
                                nombre={"TIPO"} 
                                onPress={() => {handleTipos()}}
                                sourceFoto={fotoCategorias} 
                                colorInterno={"#FCB826"} 
                                colorExterno={"#FFFDFD"} 
                                paddingTop={10}
                                paddingBottom={24}  
                                ancho={360}
                                paddingHorizontal={13}/>


                            <TarjetaCategoria 
                                nombre={"INGREDIENTE"} 
                                onPress={ () => {handleIngrediente()}    }  
                                sourceFoto={fotoCategorias} 
                                colorInterno={"#FCB826"} 
                                colorExterno={"#FFFDFD"} 
                                paddingTop={10}
                                paddingBottom={24}  
                                ancho={360}
                                paddingHorizontal={13}/>

                            <TarjetaCategoria 
                                nombre={"NOMBRE"} 
                                onPress={ () => {handleNombre()} } 
                                sourceFoto={fotoCategorias} 
                                colorInterno={"#FCB826"} 
                                colorExterno={"#FFFDFD"} 
                                paddingTop={10}
                                paddingBottom={24}  
                                ancho={360}
                                paddingHorizontal={13}/>
                            </View>}/>
    )
}


const style=StyleSheet.create(estiloApp);

export default MisCategorias;