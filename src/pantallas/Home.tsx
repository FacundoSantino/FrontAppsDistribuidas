
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



function Home(): JSX.Element{
    const navigation = useNavigation();
    const [dato, setDato] = useState<any[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [procesado, setProcesado] = useState<String[]>([]);

    const getHomeData = async () => {
        try {
        const response = await fetch("http://192.168.0.9:8080/api/rest/morfar/getHomeCommonInfo");
        const json = await response.json();
        datoProcesado(); // Llama a datoProcesado con los datos recibidos
        return json;
        } catch (err) {
        console.log(err);
        }
    }
    
    React.useEffect(() => {
        getHomeData()
        .then(data => {
            setDato(data);
            setLoaded(true);
        })
        .catch(error => console.error(error));
    }, []);
    
    const datoProcesado = () => {
        if (dato.length !== 0) {
        console.log("entroaca");
        var p: any[] = [];
        dato.forEach((d: any) => {
            p.push({
            "title": d.nombre,
            "body": d.descripcion,
            "imgUrl": d.fotos[0].urlFoto
            });
        });
        setProcesado(p);
        
        }
    };

    
    if(loaded){
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
                        
                        <CarouselCards procesado={procesado} />
                    </View>
                </View>
            }/>);
    }
    else{
        return(<Text>Cargando</Text>);
    }
}


const style=StyleSheet.create(estiloApp);

export default Home;