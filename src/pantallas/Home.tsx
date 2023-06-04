
import React, { useState } from "react";

import {View, Text, StyleSheet,Image,TextInput,SafeAreaView,ScrollView, ActivityIndicator} from "react-native";
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
import {createNavigatorFactory, useNavigation } from '@react-navigation/native';
import BarraDeBusqueda from "../componentes/BarraDeBusqueda";
import { localip } from "../App";



function Home(): JSX.Element{
    var p: any[] = [];
    const navigation = useNavigation();
    const [dato, setDato] = useState<any[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [procesado, setProcesado] = useState<String[]>([]);

    const getHomeData = async () => {
        try {
        const response = await fetch('http://' + localip + ':8080/api/rest/morfar/getHomeCommonInfo');
        const json = await response.json();
        
        return json;
        } catch (err) {
        console.log(err);
        }
    }
    
    const handleCarrouselData = ()=>{
        

        getHomeData()
        .then(data => {
            
            data.forEach((d: any) => {
                p.push({
                "title": d.nombre,
                "body": d.descripcion,
                "imgUrl": d.fotos[0].urlFoto
                });
            });
            
        })
        .catch(error => console.error(error));
        return p;
    }
    const GetCarrouselCards = ()=>{
        var data = handleCarrouselData();
        return (
            <>
            <CarouselCards procesado={data} />
            </>
        );
    }

    return( 
        <PantallaTipoHome contenido={
            <View style={style.flexColumn}>
                <View>
                    <BarraDeBusqueda/>
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
                    
                    <GetCarrouselCards></GetCarrouselCards>
                </View>
            </View>
        }/>);
    
}


const style=StyleSheet.create(estiloApp);

export default Home;