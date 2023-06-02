import { Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import PantallaTipoHome from "../componentes/PantallaTipoHome";
import estiloApp from "../estilos/estiloApp";
import Chef from "../componentes/Chef";
import { useNavigation } from "@react-navigation/native";
import lupa from "../assets/lupa.png";
import BarraDeBusqueda from "../componentes/BarraDeBusqueda";
import fotoPizza from "../assets/pizza.png";
import fotoSopa from "../assets/sopa.png";
import fotoHamburguesa from "../assets/hamburguesa.png";
import fotoMedialuna from "../assets/medialunas.png";
import fotoPastas from "../assets/pastas.jpg";

function RecetasXTipo() : JSX.Element {

    const navigation=useNavigation();

    return (
        <PantallaTipoHome contenido={
            <View style={style.flexColumnCat}>
                    <View style={style.centrar}>
                        <BarraDeBusqueda/>
                        <ScrollView contentContainerStyle={{alignItems:"center",justifyContent:"space-around"}} style={style.chef}>
                            <Chef
                                nombre={"Pizzas"}
                                imagen={fotoPizza}
                                onPress={() => navigation.navigate("MisRecetas" as never)}
                                ancho={360}
                                alto={130}
                                color={"#FFFDFD"}
                            />
                            <Chef
                                nombre={"Sopas"}
                                imagen={fotoSopa}
                                onPress={() => navigation.navigate("MisRecetas" as never)}
                                ancho={360}
                                alto={130}
                                color={"#FFFDFD"}
                            />
                            <Chef
                                nombre={"Hamburguesas"}
                                imagen={fotoHamburguesa}
                                onPress={() => navigation.navigate("MisRecetas" as never)}
                                ancho={360}
                                alto={130}
                                color={"#FFFDFD"}
                            />
                            <Chef
                                nombre={"Medialuna"}
                                imagen={fotoMedialuna}
                                onPress={() => navigation.navigate("MisRecetas" as never)}
                                ancho={360}
                                alto={130}
                                color={"#FFFDFD"}
                            />
                            <Chef
                                nombre={"Pastas"}
                                imagen={fotoPastas}
                                onPress={() => navigation.navigate("MisRecetas" as never)}
                                ancho={360}
                                alto={130}
                                color={"#FFFDFD"}
                            />

                            
                        </ScrollView>
                            
                    </View>
                </View>
        }
        />
    )
}

const style=StyleSheet.create(estiloApp);

export default RecetasXTipo;