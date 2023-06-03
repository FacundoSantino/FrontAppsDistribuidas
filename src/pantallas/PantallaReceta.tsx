import { ScrollView, StyleSheet, Text, View } from "react-native"
import PantallaTipoHome from "../componentes/PantallaTipoHome"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { Autor, Receta, Tipo, TipoParametros } from "../App";
import BarraDeBusqueda from "../componentes/BarraDeBusqueda";
import BotonFiltrar from "../componentes/BotonFiltrar";
import BotonOrdenar from "../componentes/BotonOrdenar";
import estiloApp from "../estilos/estiloApp";
import { TipoItem } from "../App";
import Chef from "../componentes/Chef";
import TarjetaReceta from "../componentes/TarjetaReceta";
import { useEffect, useState } from "react";


//Variantes: 
//Items de tipos, Items de recetas. 
//Ver ingredientes (si, no) para la busqueda por ingrediente
//Permitir seleccionar para eliminar o no
//Poner boton de agregar o no
//Titulo
//Contenido

type PantallaRecetaRouteProps= RouteProp<TipoParametros, "PantallaReceta">;

export default function PantallaReceta() : JSX.Element{

    const navigation=useNavigation();
    const route=useRoute<PantallaRecetaRouteProps>();
    const [tituloSacable,setTituloSacable]=useState(<Text style={[styles.titulo]}> {route.params.titulo} </Text>);
    const [noCambieElTitulo,setNoCambieElTitulo]=useState(true);
    const [cargoPantalla,setCargoPantalla]=useState(false);

    let listaBotones: JSX.Element[]  = [];

    function handleFetchTipoReceta(idTipo: number): void {
        console.log("Fetch recetas del tipo "+idTipo);
    }

    //route.params.contenido siempre es undefined, hay que ver como arreglarlo
    const intervalo=setInterval( () =>{
        console.log("Chequeo");
    if(route.params.contenido!=undefined){
        console.log("chequeobien");
    if(route.params.tipo==TipoItem.AUTOR){
        const contenidoMapeado: Autor[]= [];

        route.params.contenido.forEach((item: any) => (
            contenidoMapeado.push(
            {
                "idUsuario":item.idUsuario,
                "mail":item.mail,
                "nickname": item.nickname,
                "habilitado":item.habilitado,
                "nombre":item.nombre,
                "avatar": item.avatar,
                "tipo_usuario": item.tipo_usuario
            }
        )));

        console.log(contenidoMapeado);
        listaBotones=contenidoMapeado.map((item, i) => (
        <Chef
            nombre={item.nickname}
            imagen={{uri: item.avatar}}
            onPress={() => navigation.navigate("MisRecetas" as never)}
            ancho={360}
            alto={130}
            color={"#FFFDFD"}
            key={i}
        />));
    }
    else if(route.params.tipo==TipoItem.RECETA){
        const contenidoMapeado: Receta[]= [];

        route.params.contenido.forEach((item: any) => (
            contenidoMapeado.push(
            {
                idReceta:item.idReceta,
                usuario:item.idUsuario,
                nombre:item.nombre,
                descripcion:item.descripcion,
                fotos:item.fotos,
                porciones:item.porciones,
                cantidadPersonas:item.cantidadPersonas,
                tipo: item.tipo
            }
        )));

        console.log(contenidoMapeado);
        listaBotones=contenidoMapeado.map((item, i) => (
        <TarjetaReceta
            key={i}
            nombre={item.nombre}
            cantPorciones={item.porciones}
            tiempo={60}
            sourceFoto={{uri:item.fotos[0].urlFoto}}
            color={"#FFFDFD"}
            onPress={() => console.log( "Apretaste la receta de " + item.nombre)}
            ancho={380}
            alto={83.06}
          />
            ));
    }
    else if(route.params.tipo==TipoItem.TIPO){
        const contenidoMapeado: Tipo[] =[];
        if(noCambieElTitulo){
            if(route.params.titulo==""){
                setTituloSacable(<View></View>);
            }
            setNoCambieElTitulo(false);
        }
        route.params.contenido.forEach((item: any) => {
            contenidoMapeado.push({
                idTipo: item.idTipo,
                descripcion:item.descripcion,
                urlFoto: item.foto
            })
        })
        listaBotones=contenidoMapeado.map((item,i) =>(
            <Chef
            nombre={item.descripcion}
            imagen={{uri: item.urlFoto}}
            onPress={() => handleFetchTipoReceta(item.idTipo)}
            ancho={360}
            alto={130}
            color={"#FFFDFD"}
            key={i}
        />
        ));

    }
    setCargoPantalla(true);
}
},100)
    
    if(cargoPantalla){
        clearInterval(intervalo);
    return( 
        <PantallaTipoHome contenido={
            <View>
                {tituloSacable}
                <BarraDeBusqueda/>
                <View style={[styles.flexRow,{marginTop:20}]}>
                    <BotonFiltrar/>
                    <BotonOrdenar/>
                </View>
                <ScrollView style= {{marginTop:20}} contentContainerStyle={{justifyContent:"center"}}>
                    {listaBotones}                    
                </ScrollView>
            </View>
    }/>
    )}
    else{
        return(
            <Text> Cargando... </Text>
        )
    }
}

const styles=StyleSheet.create(estiloApp);


