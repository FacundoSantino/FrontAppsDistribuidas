
import React, { useState } from "react";

import {View, Text, StyleSheet,Image,TextInput,SafeAreaView,ScrollView} from "react-native";
import menuHamburguesaIcono from "../../assets/menuHamburguesaIcono.png";
import MorfAr from "../../assets/MorfAR.png";
import lupa from "../../assets/lupa.png";
import LogoSol from "../../assets/Logo_Sol_Chico.png";
import estiloApp from "../../estilos/estiloApp";
import fotoMisRecetas from "../../assets/mis_recetas.png";
import fotoMiLista from "../../assets/mi_lista.png";
import fotoCategorias from "../../assets/categorias.png";
import TarjetaCategoria from "../../componentes/TarjetaCategoria";
import { createNavigatorFactory, useNavigation } from '@react-navigation/native';
import BarraDeBusqueda from "../../componentes/BarraDeBusqueda";
import PantallaTipoHome from "../../componentes/PantallaTipoHome";
import { TipoItem, localip } from "../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";


function MisGuardadas(): JSX.Element{
    const navigation = useNavigation();

    const urlBase="http://"+localip+":8080/api/rest/morfar";
    const urlRecetasFavoritas=urlBase+"/getFavoritos/";

    const fetchRecetasFavoritas= async () => {
        try{
        const response=await fetch(urlRecetasFavoritas+await AsyncStorage.getItem("idUsuario"));
        const data=await response.json();
        console.log("FAVORITAS");
        return data;
        }
        catch (error) {
            console.log(error);
        }
    }

    const irAFavoritas = async ()=> {
        fetchRecetasFavoritas().then((data) => navigation.navigate("PantallaReceta" as never,{tipo: TipoItem.RECETA,
            verIngredientes:false,
            permitirEliminacion:false,
            permitirAgregacion:false,
            esFavoritos:true,
            titulo: "",
            contenido: data
        } as never));
    }

    return( 
        <PantallaTipoHome contenido={
        <View>
                    <BarraDeBusqueda/>
                        <TarjetaCategoria 
                            nombre={"RECETAS FAVORITAS"} 
                            onPress={() => irAFavoritas()}
                            sourceFoto={fotoMisRecetas} 
                            colorInterno={"#FCB826"} 
                            colorExterno={"#FFFDFD"} 
                            paddingTop={10}
                            paddingBottom={24} 
                            ancho={380}
                            paddingHorizontal={13}
                            />
                        <TarjetaCategoria 
                            nombre={"RECETAS MODIFICADAS"} 
                            onPress={() => navigation.navigate("RecetasModificadas" as never)}
                            sourceFoto={fotoMiLista} 
                            colorInterno={"#FCB826"} 
                            colorExterno={"#FFFDFD"} 
                            paddingTop={10}
                            paddingBottom={24}  
                            ancho={380}
                            paddingHorizontal={13}/>
                    
                    </View>}/>
    )
}


const style=StyleSheet.create(estiloApp);

export default MisGuardadas;