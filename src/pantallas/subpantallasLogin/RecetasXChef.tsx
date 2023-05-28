import React, { useState } from "react";

import {View, Text, StyleSheet,Image,TextInput,SafeAreaView,ScrollView} from "react-native";
import menuHamburguesaIcono from "../../assets/menuHamburguesaIcono.png";
import MorfAr from "../../assets/MorfAR.png";
import lupa from "../../assets/lupa.png";
import LogoSol from "../../assets/Logo_Sol_Chico.png";
import estiloApp from "../../estilos/estiloApp";
import TarjetaCategoria from "../../componentes/Chef";
import fotoMiLista from "../../assets/mi_lista.png";
import fotoCategorias from "../../assets/categorias.png";
import CarouselCards from "../../CarouselCards";
import { createNavigatorFactory, useNavigation } from '@react-navigation/native';
import Chef from "../../componentes/Chef";
import PantallaTipoHome from "../../componentes/PantallaTipoHome";
import chef1 from '../../assets/chef1.jpg';
import chef2 from '../../assets/chef2.jpg';
import chef3 from '../../assets/chef3.jpg';
function RecetasXChef(): JSX.Element{
    const navigation = useNavigation();
    return(
        <PantallaTipoHome contenido={
                <View style={style.flexColumnCat}>
                    <View style={style.centrar}>
                        <View style={[style.cajaBusqueda, style.flexRow]}>
                            <Image source={lupa} style={style.elemento} />
                            <TextInput style={style.elemento} placeholder="Ingresá tu busqueda..." />
                        </View>
                        <View style={style.chef}>
                            <Chef
                                nombre={"Agustin Ferrentino"}
                                imagen={chef1}
                                onPress={() => navigation.navigate("MisRecetas" as never)}
                                ancho={360}
                                alto={130}
                                color={"#FFFDFD"}
                            />
                            <Chef
                                nombre={"Agustina Lopez"}
                                imagen={chef2}
                                onPress={() => navigation.navigate("MisRecetas" as never)}
                                ancho={360}
                                alto={130}
                                color={"#FFFDFD"}
                            />
                            <Chef
                                nombre={"Facundo Sanchez"}
                                imagen={chef2}
                                onPress={() => navigation.navigate("MisRecetas" as never)}
                                ancho={360}
                                alto={130}
                                color={"#FFFDFD"}
                            />
                            <Chef
                                nombre={"Nahuel Santillan"}
                                imagen={chef3}
                                onPress={() => navigation.navigate("MisRecetas" as never)}
                                ancho={360}
                                alto={130}
                                color={"#FFFDFD"}
                            />

                            
                        </View>
                            
                    </View>
                </View>
        }/>
    )

}

const style=StyleSheet.create(estiloApp);

export default RecetasXChef;