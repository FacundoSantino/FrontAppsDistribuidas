
import React from "react";

import {View, Text, StyleSheet,Image,TextInput} from "react-native";
import menuHamburguesaIcono from "../assets/menuHamburguesaIcono.png";
import MorfAr from "../assets/MorfAR.png";
import lupa from "../assets/lupa.png";
import LogoSol from "../assets/Logo_Sol_Chico.png";
import estiloApp from "../estilos/estiloApp";

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
                    

                </View>

            </View>
        </View>
    )



}

const style=StyleSheet.create(estiloApp);

export default Home;