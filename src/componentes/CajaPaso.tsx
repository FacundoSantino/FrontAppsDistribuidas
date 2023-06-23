import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import estiloApp from "../estilos/estiloApp";
import IconoCruz from '../assets/cruz.png'

type cajaPasoProps={
    numeroPaso:number,
    descripcion:string,
    onPress():void
}

export default function CajaPaso(props:cajaPasoProps) : JSX.Element {
    return(
        <View style={[styles.flexRow,{display:"flex",alignContent:"center",borderWidth:2,borderRadius:45,justifyContent:"space-around", minHeight:50, width: "90%", alignSelf:'center',marginBottom:5,marginTop:5,height:"auto"}]}>

            <Text>{props.numeroPaso+"."}</Text>

            <Text style={{flexWrap:"wrap", width:"60%",alignSelf:"center",justifyContent:"center"}}> {props.descripcion}</Text>

            <TouchableOpacity onPress={props.onPress}><Image source={IconoCruz} style={{width:20,height:20,marginLeft:10}}/></TouchableOpacity>

        </View>
    )
}

const styles=StyleSheet.create(estiloApp);