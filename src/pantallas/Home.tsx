
import React, { useState } from "react";

import {View, Text, StyleSheet,Image,TextInput,SafeAreaView,ScrollView} from "react-native";
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
import { createNavigatorFactory, useNavigation } from '@react-navigation/native';


function Home(): JSX.Element{
    const navigation = useNavigation();
    return( 
        <PantallaTipoHome contenido={
            <View style={style.flexColumn}>
                <View>
                    <View style={[style.cajaBusqueda, style.flexRow]}>
                        <Image source={lupa} style={style.elemento} />
                        <TextInput style={style.elemento} placeholder="Ingresá tu busqueda..." />
                    </View>
                    <TarjetaCategoria 
                        nombre={"MIS RECETAS"} 
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
                        onPress={() => navigation.navigate("misGuardadas" as never)
                        } 
                        sourceFoto={fotoMiLista} 
                        colorInterno={"#FCB826"} 
                        colorExterno={"#FFFDFD"} 
                        paddingTop={10}
                        paddingBottom={24}  
                        ancho={360}
                        paddingHorizontal={13}/>

                    <TarjetaCategoria 
                        nombre={"CATEGORIAS"} 
                        onPress={() => navigation.navigate("MisCategorias" as never) } 
                        sourceFoto={fotoCategorias} 
                        colorInterno={"#FCB826"} 
                        colorExterno={"#FFFDFD"} 
                        paddingTop={10}
                        paddingBottom={24}  
                        ancho={360}
                        paddingHorizontal={13}/>
                </View>
                <View style={style.carouselContainer}>
                    <CarouselCards />
                </View>
            </View>
        }/>
    )
}


const style=StyleSheet.create(estiloApp);

export default Home;