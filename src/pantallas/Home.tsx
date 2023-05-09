
import React from "react";

import {View, Text, StyleSheet,Image,TextInput} from "react-native";
import menuHamburguesaIcono from "../assets/menuHamburguesaIcono.png";
import MorfAr from "../assets/MorfAR.png";
import lupa from "../assets/lupa.png";
import LogoSol from "../assets/Logo_Sol_Chico.png";
import estiloApp from "../estilos/estiloApp";
import TarjetaCategoria from "../componentes/TarjetaCategoria";
import fotoMisRecetas from "../assets/mis_recetas.png";
import fotoMiLista from "../assets/mi_lista.png";
import fotoCategorias from "../assets/categorias.png";


function Home(): JSX.Element{

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

                <View style={style.flexColumn}>

                    <View style={[style.cajaBusqueda, style.flexRow]}>

                        <Image source={lupa} style={style.elemento} />

                        <TextInput style={style.elemento} placeholder="Ingresá tu busqueda..." />

                    </View>

                    <View style={style.flexColumn}>

                        <TarjetaCategoria 
                        nombre={"MIS RECETAS"} 
                        onPress={function (): void {
                            console.log("Mis recetas");
                        } } 
                        sourceFoto={fotoMisRecetas} 
                        colorInterno={"#FCB826"} 
                        colorExterno={"#FFFDFD"} 
                        paddingTop={10}
                        paddingBottom={24} 
                        ancho={334}
                        paddingHorizontal={13}/>

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
                        ancho={334}
                        paddingHorizontal={13}/>

                        <TarjetaCategoria 
                        nombre={"CATEGORIAS"} 
                        onPress={function (): void {
                            console.log("Categorías");
                        } } 
                        sourceFoto={fotoCategorias} 
                        colorInterno={"#FCB826"} 
                        colorExterno={"#FFFDFD"} 
                        paddingTop={10}
                        paddingBottom={24}  
                        ancho={334}
                        paddingHorizontal={13}/>

                    </View>
                    

                </View>

            </View>
        </View>
    )



}

const style=StyleSheet.create(estiloApp);

export default Home;