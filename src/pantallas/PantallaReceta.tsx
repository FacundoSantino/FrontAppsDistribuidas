import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import PantallaTipoHome from "../componentes/PantallaTipoHome"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { Autor, Ingrediente, Receta, Tipo, TipoParametros } from "../App";
import BarraDeBusqueda from "../componentes/BarraDeBusqueda";
import BotonFiltrar from "../componentes/BotonFiltrar";
import BotonOrdenar from "../componentes/BotonOrdenar";
import estiloApp from "../estilos/estiloApp";
import { TipoItem } from "../App";
import Chef from "../componentes/Chef";
import TarjetaReceta from "../componentes/TarjetaReceta";
import { useEffect, useState } from "react";
import CajaIngrediente from "../componentes/CajaIngrediente";


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
    const [cargoPantalla,setCargoPantalla]=useState(true);
    const [botonAgregacion,setBotonAgregacion]=useState(<View></View>);
    const [seteado,setSeteado]=useState(false);

    let listaBotones: JSX.Element[]  = [];

    function handleFetchTipoReceta(idTipo: number): void {
        console.log("Fetch recetas del tipo "+idTipo);
    }

    //route.params.contenido siempre es undefined, hay que ver como arreglarlo
    if(route.params.tipo==TipoItem.AUTOR && typeof route.params.tipo != 'undefined'){
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
            nombre={item.nombre}
            imagen={{uri: item.avatar}}
            onPress={() => navigation.navigate("MisRecetas" as never)}
            ancho={360}
            alto={130}
            color={"#FFFDFD"}
            key={i}
        />));
    }
    else if(route.params.tipo==TipoItem.RECETA && typeof route.params.tipo != 'undefined'){
        const contenidoMapeado: Receta[]= [];

        if(route.params.permitirAgregacion && !seteado){
            
            setSeteado(true);
        }

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
    else if(route.params.tipo==TipoItem.TIPO && typeof route.params.tipo != 'undefined'){
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
            onPress={() => console.log("Apretaste el nombre "+item.descripcion)}
            ancho={360}
            alto={130}
            color={"#FFFDFD"}
            key={i}
        />
        ));

    }
    else if(route.params.tipo==TipoItem.INGREDIENTE && typeof route.params.tipo != 'undefined'){
        const contenidoMapeado: Ingrediente[]= [];
        // idIngrediente:number,
        // nombre:String
        console.log(route.params.contenido);
        route.params.contenido.forEach((item: any) => (
            contenidoMapeado.push(
            {
                idIngrediente:item.idIngrediente,
                nombre:item.nombre
            }
        )));

        listaBotones=contenidoMapeado.map((item,i) =>(
            <CajaIngrediente
                nombre={item.nombre}
                sourceFoto={{ uri: 'https://cdn.discordapp.com/attachments/1086019817926045728/1114650034965860443/dinner_1.png' }}
                onPress={() => {
                    console.log("Apretaste ingrediente " + item.nombre);
                } } 
                ancho={360}
                colorInterno="#FFFFFF"
                colorExterno="#FFFFFF"
                key={item.idIngrediente} 
                paddingTop={0} 
                paddingBottom={0} 
                paddingHorizontal={0} 
           />
        ));
    }
    else if(route.params.tipo==TipoItem.RECETANOMBRE && typeof route.params.tipo != 'undefined' ){
        const contenidoMapeado: Tipo[]= [];
        if(noCambieElTitulo){
            if(route.params.titulo==""){
                setTituloSacable(<View></View>);
            }
            setNoCambieElTitulo(false);
        }
        console.log(route.params.contenido);
        route.params.contenido.forEach((item: any) => (
            contenidoMapeado.push(
            {
                idTipo: item.idTipo,
                descripcion:item.descripcion,
                urlFoto: item.foto
                
            }
        )));

        
        listaBotones=contenidoMapeado.map((item, i) => (

            <Chef 
            nombre={item.descripcion} 
            imagen={{uri:item.urlFoto}} 
            onPress={function (): void 
                {console.log("Apretaste el boton de las recetas de nombre "+ item.descripcion)   } 
            } 
            ancho={360} 
            alto={130} 
            color={"#FFFFFF"}            
            />
            ));
    }

    
    
    if(cargoPantalla){
        return( 
            <PantallaTipoHome contenido={
                <View>
                    {tituloSacable}
                    <BarraDeBusqueda/>
                    <View style={[styles.flexRow,{marginTop:20}]}>
                        <BotonFiltrar/>
                        <BotonOrdenar/>
                    </View>
                    <ScrollView style= {{marginTop:8, height:'75%'}} contentContainerStyle={{justifyContent:"center"}}>
                        {listaBotones}           
                    </ScrollView>
                    {(route.params.permitirAgregacion)?
                    <View style={{backgroundColor:'white',width:'100%', position:'absolute', height:65, bottom:0,alignSelf:'center',zIndex:80}}>
                        <TouchableOpacity style={{marginTop:6,display:"flex", backgroundColor:'#F0AF23',height:'100%',width:335,minHeight:50,alignSelf:"center", justifyContent:'center', borderRadius: 20}}>
                            <Text style={{alignSelf:"center",fontSize:20,borderRadius:25, justifyContent:"center"}}>AGREGAR</Text>
                        </TouchableOpacity>
                    </View>
                    :null}  
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


