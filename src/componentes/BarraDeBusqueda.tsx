import { Image, StyleSheet, TextInput, View } from "react-native";
import estiloApp from "../estilos/estiloApp";
import lupa from "../assets/lupa.png";

function BarraDeBusqueda(): JSX.Element{

    return(
            <View style={[style.cajaBusqueda, style.flexRow]}>
                <Image source={lupa} style={style.elemento} />
                <TextInput style={style.elemento} placeholder="Ingresá tu busqueda..." />
            </View>
    )
}

const style=StyleSheet.create(estiloApp);

export default BarraDeBusqueda;

