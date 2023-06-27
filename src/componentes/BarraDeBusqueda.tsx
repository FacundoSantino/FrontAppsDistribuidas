import { Image, StyleSheet, TextInput, View } from "react-native";
import estiloApp from "../estilos/estiloApp";
import lupa from "../assets/lupa.png";
import { useState } from "react";
import { TipoItem, localip } from "../App";
import { useNavigation } from "@react-navigation/native";

function BarraDeBusqueda(): JSX.Element{

    const [texto,setTexto]=useState<string>("");

    const navigation=useNavigation();

    const fetchRecetasNombre = async (texto:string) => {
        try {
            const response= fetch("http://"+localip+":8080/api/rest/morfar"+"/getRecipesByName?nombre="+texto);
            const data=(await response).json();
            navigation.navigate("PantallaReceta" as never, {tipo: TipoItem.RECETA,
                verIngredientes:false,
                permitirEliminacion:false,
                permitirAgregacion:false,
                titulo: "Recetas de "+texto,
                esFavoritos:false,
                contenido:await  data
            } as never);
        } catch (error) {
            console.log(error);
        }
    }

    return(
            <View style={[style.cajaBusqueda, style.flexRow]}>
                <Image source={lupa} style={style.elemento} />
                <TextInput autoCorrect={false} onSubmitEditing={(e) => fetchRecetasNombre(texto)} onChangeText={(text) => setTexto(text)} style={style.elemento} placeholder="Ingresá tu busqueda..." />
            </View>
    )
}

const style=StyleSheet.create(estiloApp);

export default BarraDeBusqueda;

