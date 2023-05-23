
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


function Home(): JSX.Element{
    const navigation = useNavigation();
    return( 
        <View>
            <View style={style.bgHeaderPrincipal}>
                <View style={style.flexRow}>
                    <Image source={menuHamburguesaIcono}/>
                    <Image source={MorfAr} style={style.morfar}/>
                    <Image source={LogoSol}/>
                </View>
            </View>
            <View style={style.bgPrincipal}>
                <View style={style.flexColumnCat}>
                    <View style={style.centrar}>
                        <View style={[style.cajaBusqueda, style.flexRow]}>
                            <Image source={lupa} style={style.elemento} />
                            <TextInput style={style.elemento} placeholder="Ingresá tu busqueda..." />
                        </View>
                            <TarjetaCategoria 
                                nombre={"TODAS LAS RECETAS"} 
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
                                nombre={"AUTOR"} 
                                onPress={() => navigation.navigate("misGuardadas" as never)}
                                sourceFoto={fotoMiLista} 
                                colorInterno={"#FCB826"} 
                                colorExterno={"#FFFDFD"} 
                                paddingTop={10}
                                paddingBottom={24}  
                                ancho={360}
                                paddingHorizontal={13}/>
                            <TarjetaCategoria 
                                nombre={"TIPO"} 
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
                            </View>
                    </View>
                </View>
            </View>
    )
}


const style=StyleSheet.create(estiloApp);

export default Home;