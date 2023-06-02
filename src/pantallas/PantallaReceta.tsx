import { ScrollView, StyleSheet, Text, View } from "react-native"
import PantallaTipoHome from "../componentes/PantallaTipoHome"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { Autor, Receta, TipoParametros } from "../App";
import BarraDeBusqueda from "../componentes/BarraDeBusqueda";
import BotonFiltrar from "../componentes/BotonFiltrar";
import BotonOrdenar from "../componentes/BotonOrdenar";
import estiloApp from "../estilos/estiloApp";
import { TipoItem } from "../App";
import Chef from "../componentes/Chef";
import TarjetaReceta from "../componentes/TarjetaReceta";


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

    let listaBotones= [];

    if(route.params.tipo==TipoItem.TIPO){
        const contenidoMapeado: Autor[]= [];
        let i=0;
        while(i!=4){
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
        i++;
        }
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
        let i=0;
        while(i!=4){
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
        i++;
        }
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
    
    return( 
        <PantallaTipoHome contenido={
            <View>
                <Text style={[styles.titulo]}> {route.params.titulo} </Text>
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
    )
}

const styles=StyleSheet.create(estiloApp);
