import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import PantallaTipoHome from "../componentes/PantallaTipoHome"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { Autor, Ingrediente, Receta, RecipeByIngredientDTO, RecipeByIngredientDTOAuxiliar, Tipo, TipoPantalla, TipoParametros, localip } from "../App";
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
    const urlBase="http://"+localip+":8080/api/rest/morfar";
    const urlFetchPasos=urlBase+'/getPasos/';
    const [tituloSacable,setTituloSacable]=useState(<Text style={[styles.titulo]}> {route.params.titulo} </Text>);
    const [noCambieElTitulo,setNoCambieElTitulo]=useState(true);
    const [cargoPantalla,setCargoPantalla]=useState(true);
    const [botonAgregacion,setBotonAgregacion]=useState(<View></View>);
    const [seteado,setSeteado]=useState(false);
    const [listaSelecciones,setListaSelecciones]=useState<RecipeByIngredientDTOAuxiliar[]>([]);
    const [cargueIngredientes,setCargueIngredientes]=useState(false);

    let listaBotones: JSX.Element[]  = [];

    async function handleFetchTipoReceta(idTipo: number,nombre:string) {
        await fetch(urlBase+"/recipeType/"+idTipo).then((r) => r.json()).then((data) => {
        navigation.navigate("PantallaRecetaClon" as never,
            {tipo: TipoItem.RECETA,
                verIngredientes:false,
                permitirEliminacion:false,
                permitirAgregacion:false,
                titulo: "Recetas de "+nombre,
                contenido: data
            } as never);
    })}
    

    async function handleFetchRecetaPorNombre(nombre:string){
        await fetch(urlBase+"/getRecipesByName?nombre="+nombre).then((r) => r.json()).then((data) => {
            console.log("DATOS");
            console.log(data);
            navigation.navigate("PantallaRecetaClon" as never,
            {tipo: TipoItem.RECETA,
                verIngredientes:false,
                permitirEliminacion:false,
                permitirAgregacion:false,
                titulo: "Recetas de "+nombre,
                contenido: data
            } as never);
        })
    }
    

    const pasosFetch= async (idReceta: number) => {
        try{
            const respuesta= await fetch(urlFetchPasos+idReceta);
            const data = await respuesta.json();
            return data;
        }
        catch(err){
            console.log(err);
        }
    
    }

    async function handleReceta(item: Receta){
        await pasosFetch(item.idReceta).then((data) =>{
            navigation.navigate("Receta" as never,
            {
                tipoPantalla:TipoPantalla.NOMILISTA,
                titulo:item.nombre,
                contenido: item,
                pasos: data
            } as never)
        });
    
    }

    async function fetchRecetasAutor(idUsuario:number){
        try{
            const respuesta=await fetch(urlBase+"/recipes/"+idUsuario);
            console.log(respuesta.status);
            const data=await respuesta.json()
            return data;
        }
        catch(err){
            console.log(err);
        }
    }

    async function handleFetchRecetasAutor(idUsuario: number,nombreUsuario:String){
        console.log("------------------------FETCH---------------------");
        fetchRecetasAutor(idUsuario).then(
            async (data) =>{
                console.log("-----------ESTOY INTENTANDO NAVEGAR--------------- al clon");
                navigation.navigate("PantallaRecetaClon" as never, 
                {tipo: TipoItem.RECETA,
                    verIngredientes:false,
                    permitirEliminacion:false,
                    permitirAgregacion:false,
                    titulo: "Recetas de "+nombreUsuario,
                    contenido: data
                } as never);
            }
        )

      
    }

    async function handleFetchRecetasPorIngredientes(){

        const listaResultante: RecipeByIngredientDTO[]= [];
        listaSelecciones.forEach( (item) => {
            if(item.quiero==0){
                listaResultante.push(
                    {
                        id:item.id,
                        quiero:true
                    }
                )
            }
            else if(item.quiero==1){
                listaResultante.push(
                    {
                        id:item.id,
                        quiero:false
                    }
                )
            }
        })
        
        console.log("ACA VA EL PRINT");
        listaResultante.forEach((item) => {
            console.log("ITEM: "+item.id+" QUIERO? "+ item.quiero);
        })

        await fetch(urlBase+"/recipeByIngredient",{
            method:"POST",
            headers:{"Content-type": "application/json; charset=UTF-8"},
            body:JSON.stringify(listaResultante)
        }).then((r) => r.json()).then( (data) => {
            navigation.navigate("PantallaRecetaClon" as never,
            {tipo: TipoItem.RECETA,
                verIngredientes:false,
                permitirEliminacion:false,
                permitirAgregacion:false,
                titulo: "Recetas por ingrediente",
                contenido: data
            } as never)}
        )
    }

    
        //route.params.contenido siempre es undefined, hay que ver como arreglarlo
        if(route.params.tipo==TipoItem.AUTOR && typeof route.params.tipo != 'undefined'){
            console.log("-------------------if1-----------------------");
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
                onPress={() => handleFetchRecetasAutor(item.idUsuario,item.nombre)}
                ancho={360}
                alto={130}
                color={"#FFFDFD"}
                key={i}
            />));
        }
        else if(route.params.tipo==TipoItem.RECETA && typeof route.params.tipo != 'undefined'){
            console.log("-------------------if2-----------------------");
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
                onPress={() => handleReceta(item)}
                ancho={380}
                alto={83.06}
            />
                ));
        }
        else if(route.params.tipo==TipoItem.TIPO && typeof route.params.tipo != 'undefined'){
            console.log("-------------------if3-----------------------");
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
                onPress={() => handleFetchTipoReceta(item.idTipo,item.descripcion)}
                ancho={360}
                alto={130}
                color={"#FFFDFD"}
                key={i}
            />
            ));

        }
        else if(route.params.tipo==TipoItem.INGREDIENTE && typeof route.params.tipo != 'undefined'){

            const contenidoMapeado: Ingrediente[]= [];

            route.params.contenido.forEach((item: any) => (
                contenidoMapeado.push(
                {
                    idIngrediente:item.idIngrediente,
                    nombre:item.nombre,
                    urlFoto:item.urlFoto
                }
            )));

            if(!cargueIngredientes){
                console.log("ENTRO ACA ENTRO ACA ENTRO ACA");
                const listaNueva: RecipeByIngredientDTOAuxiliar[]=[];
                route.params.contenido.forEach((item:any) => (
                    listaNueva.push({
                        id:item.idIngrediente,
                        quiero:2
                    }
                    )
                ))
                setListaSelecciones(listaNueva);
                setCargueIngredientes(true);

            }
            console.log(listaSelecciones);
            console.log("----------------------------imprimo-------------------------")
            listaBotones=contenidoMapeado.map((item,i) =>(
                <CajaIngrediente
                    nombre={item.nombre}
                    sourceFoto={{uri:item.urlFoto}}
                    cambioEstado={(x) => {
                        listaSelecciones.forEach((itema) => {
                            if(item.idIngrediente==itema.id){
                                itema.quiero=x;
                                return 0;
                            }
                        })
                        listaSelecciones.forEach((item) => {
                            console.log(" ");
                            console.log("---------------------");
                            console.log("ID ITEM: "+item.id);
                            console.log("ESTADO ITEM "+item.quiero);
                            console.log("---------------------");
                            console.log(" ");
                        })
                        if(x==2){
                            console.log("VACIO");
                        }
                        else if(x==1){
                            console.log("NO QUIERO");
                        }
                        else if(x==0){
                            console.log("QUIERO");
                        }
                    }}
                    ancho={320}
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
            console.log("-------------------if5-----------------------");
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
                    {handleFetchRecetaPorNombre(item.descripcion)   } 
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
                    <ScrollView style= {{marginTop:8, height:'65%'}} contentContainerStyle={{justifyContent:"center"}}>
                        {listaBotones}           
                    </ScrollView>
                    {(route.params.permitirAgregacion)?
                    <View style={{backgroundColor:'white',width:'100%', position:'relative', height:65, bottom:0,alignSelf:'center',zIndex:80}}>
                        <TouchableOpacity onPress={() => navigation.navigate("CrearReceta" as never)} style={{marginTop:6,display:"flex", backgroundColor:'#F0AF23',height:'100%',width:335,minHeight:50,alignSelf:"center", justifyContent:'center', borderRadius: 20}}>
                            <Text style={{alignSelf:"center",fontSize:20,borderRadius:25, justifyContent:"center"}}>AGREGAR</Text>
                        </TouchableOpacity>
                    </View>
                    :null}  
                    {route.params.verIngredientes?
                    
                    <View style={{backgroundColor:'white',width:'100%', position:"relative", height:65, bottom:0,alignSelf:'center',zIndex:80}}>
                        <TouchableOpacity onPress={() => handleFetchRecetasPorIngredientes()} style={{marginTop:6,display:"flex", backgroundColor:'#F0AF23',height:'100%',width:335,minHeight:50,alignSelf:"center", justifyContent:'center', borderRadius: 20}}>
                            <Text style={{alignSelf:"center",fontSize:20,borderRadius:25, justifyContent:"center"}}>Buscar</Text>
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






