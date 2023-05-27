import {View, Text, StyleSheet,Image,TextInput,SafeAreaView,ScrollView,FlatList,Animated } from "react-native";
import TarjetaReceta from "../componentes/TarjetaReceta";
import fotoMisRecetas from "../assets/mis_recetas.png";
import PantallaTipoHome from "../componentes/PantallaTipoHome";
import estiloApp from "../estilos/estiloApp";
function MisRecetas(): JSX.Element{

    const recetas = [];
    for (let i = 0; i < 100; i++) {
      recetas.push(<TarjetaReceta
        nombre={'titulo'}
        cantPorciones={2}
        tiempo={60}
        sourceFoto={fotoMisRecetas}
        color={"#FFFDFD"}
        onPress={() => console.log()}
        ancho={380}
        alto={83.06}
      />);
    }
    return(

        <PantallaTipoHome contenido ={
            <View>
            <View style={styles.filtros}>
                <Text> filtrar</Text>
                <Text> ordenar</Text>
            </View>
            <ScrollView>
                {recetas}
            </ScrollView>  
            </View>}/>
    )}

    const styles= StyleSheet.create(estiloApp)
export default MisRecetas;