
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
import { TipoItem } from "../../App";


function MisCategorias(): JSX.Element{
    const navigation = useNavigation();

    
const urlFetchUsuarios="http://192.168.0.9:8080/api/rest/morfar/getUsers";
const urlFetchTodasLasRecetas="http://192.168.0.9:8080/api/rest/morfar/getAllRecipes"
const [contenidoAMostrar, setContenidoAMostrar]=useState([]);

const autoresFetch= async () =>{
    console.log("intentando fetch");
    try{
      const respuesta= await fetch(urlFetchUsuarios, {     
        method: 'GET',
      }).then((data) => data.json()).then(content => setContenidoAMostrar(content));
      return 0;
    } catch(err){
      console.log(err);
      return 1;
    }
  }

  const handleAutores = () => {
    console.log("Manejando fetch");
    autoresFetch()
      .then(data => {
        if(data==0){
            //bien
            navigation.navigate("PantallaReceta" as never, 
                                {tipo: TipoItem.TIPO,
                                    verIngredientes:false,
                                    permitirEliminacion:false,
                                    permitirAgregacion:false,
                                    titulo: "Recetas por Autor",
                                    contenido: contenidoAMostrar
                                } as never)
        }
        else{
            //mal
            console.log("Salio mal el fetch de autores");
        }
        }
      );
  };

  const recetasFetch= async () => {
    try{
        const respuesta= await fetch(urlFetchTodasLasRecetas, {
            method: 'GET'
        }).then((data) => data.json()).then(content=>setContenidoAMostrar(content));
        return 0;
    }
    catch(err){
        console.log(err);
        return 1;
    }
  }

  const handleRecetas = () =>{
    console.log("Manejando recetas");
    recetasFetch()
    .then(data =>{
        if(data==0){
            navigation.navigate("PantallaReceta" as never, 
            {tipo: TipoItem.RECETA,
                verIngredientes:false,
                permitirEliminacion:false,
                permitirAgregacion:false,
                titulo: "Todas las Recetas",
                contenido: contenidoAMostrar
            } as never)
        }
        else{
            console.log("Salio mal el fetch de todas las recetas");
        }
    })
  }

    return( 
        <PantallaTipoHome contenido={
            <View style={style.flexColumn}>
                        <BarraDeBusqueda/>
                            <TarjetaCategoria 
                                nombre={"TODAS LAS RECETAS"} 
                                onPress={() => handleRecetas()}
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
                                onPress={() => {navigation.navigate("RecetasXTipo" as never)}}
                                sourceFoto={fotoCategorias} 
                                colorInterno={"#FCB826"} 
                                colorExterno={"#FFFDFD"} 
                                paddingTop={10}
                                paddingBottom={24}  
                                ancho={360}
                                paddingHorizontal={13}/>


                            <TarjetaCategoria 
                                nombre={"INGREDIENTE"} 
                                onPress={function (): void {
                                    console.log("Apreto el boton");
                                    
                                } } 
                                sourceFoto={fotoCategorias} 
                                colorInterno={"#FCB826"} 
                                colorExterno={"#FFFDFD"} 
                                paddingTop={10}
                                paddingBottom={24}  
                                ancho={360}
                                paddingHorizontal={13}/>

                            <TarjetaCategoria 
                                nombre={"NOMBRE"} 
                                onPress={function (): void {
                                    console.log("Apreto el boton");
                                    
                                } } 
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