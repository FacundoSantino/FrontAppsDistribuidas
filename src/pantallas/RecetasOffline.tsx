import {Image, StyleSheet, TextInput, View} from "react-native";
import PantallaTipoHome from "../componentes/PantallaTipoHome";
import estiloApp from "../estilos/estiloApp";
import lupa from "../assets/lupa.png";
import TarjetaCategoria from "../componentes/TarjetaCategoria";
import { useNavigation } from "@react-navigation/native";
import fotoFavoritas from "../assets/RecetasFavoritas.png"
import fotoModificadas from "../assets/RecetasModificadas.png"

export default function RecetasOffline(): JSX.Element{
    const navigation= useNavigation();
    return(
        <PantallaTipoHome contenido={
            <View>
                    <View style={[style.cajaBusqueda, style.flexRow]}>
                        <Image source={lupa} style={style.elemento} />
                        <TextInput style={style.elemento} placeholder="Ingresá tu busqueda..." />
                    </View>
                    <TarjetaCategoria 
                        nombre={"RECETAS FAVORITAS"} 
                        onPress={() => navigation.navigate("RecetasFavoritasOffline" as never)
                        } 
                        sourceFoto={fotoFavoritas} 
                        colorInterno={"#FCB826"} 
                        colorExterno={"#FFFDFD"} 
                        paddingTop={10}
                        paddingBottom={24}  
                        ancho={360}
                        paddingHorizontal={13}
                    />

                    <TarjetaCategoria 
                        nombre={"RECETAS MODIFICADAS"} 
                        onPress={() => navigation.navigate("RecetasModificadasOffline" as never)
                        } 
                        sourceFoto={fotoModificadas} 
                        colorInterno={"#FCB826"} 
                        colorExterno={"#FFFDFD"} 
                        paddingTop={10}
                        paddingBottom={24}  
                        ancho={360}
                        paddingHorizontal={13}
                    />

            </View>
        }/>
    )
}

const style=StyleSheet.create(estiloApp);