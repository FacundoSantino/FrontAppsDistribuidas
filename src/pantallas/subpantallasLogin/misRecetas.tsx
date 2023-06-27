
import React, { useState } from "react";

import {View, Text, StyleSheet,Image,TextInput,SafeAreaView,ScrollView} from "react-native";
import menuHamburguesaIcono from "../assets/menuHamburguesaIcono.png";
import MorfAr from "../assets/MorfAR.png";
import lupa from "../assets/lupa.png";
import LogoSol from "../assets/Logo_Sol_Chico.png";
import estiloApp from "../../estilos/estiloApp";
import fotoMisRecetas from "../assets/mis_recetas.png";
import fotoMiLista from "../assets/mi_lista.png";
import fotoCategorias from "../assets/categorias.png";

import { createNavigatorFactory, useNavigation } from '@react-navigation/native';
import TarjetaCategoria from "../../componentes/TarjetaCategoria";
import CarouselCards from "../../CarouselCards";
import PantallaTipoHome from "../../componentes/PantallaTipoHome";
import BarraDeBusqueda from "../../componentes/BarraDeBusqueda";


function misRecetas(): JSX.Element{
    const navigation = useNavigation();
    return(
        <PantallaTipoHome contenido={
        <View>
            
                    <BarraDeBusqueda/>
                        <TarjetaCategoria 
                            nombre={"RECETAS FAVORITAS"} 
                            onPress={() => navigation.navigate("MisRecetas" as never)}
                            sourceFoto={fotoMisRecetas} 
                            colorInterno={"#FCB826"} 
                            colorExterno={"#FFFDFD"} 
                            paddingTop={10}
                            paddingBottom={24} 
                            ancho={360}
                            paddingHorizontal={13}
                            />
                        <TarjetaCategoria 
                            nombre={"MI LISTA"} 
                            onPress={function (): void {
                                console.log("Mi lista");
                            } } 
                            sourceFoto={fotoMiLista} 
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

export default misRecetas;