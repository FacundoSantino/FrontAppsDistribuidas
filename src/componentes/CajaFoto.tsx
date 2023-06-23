import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import fotoCruz from "../assets/cruz.png"
import estiloApp from "../estilos/estiloApp"

type cajaFotoProps={
    urlFoto:string,
    descripcion:string,
    onPress():void
}

export default function CajaFoto(props:cajaFotoProps){



    return(
        <View style={[styles.flexRow,{borderWidth:2,borderRadius:45,justifyContent:"space-around", width: "90%", alignSelf:'center',marginBottom:10,marginTop:5,minHeight:70}]}>
            <Image style={{width:60,height:60, borderRadius:15,borderColor:"black",borderWidth:1}} source={ {uri:props.urlFoto}}/>
            <Text style={{flexWrap:"wrap",width:"30%"}}>{props.descripcion}</Text>
            <TouchableOpacity onPress={() => props.onPress()}>
                <Image style={{width:41,height:41}} source={fotoCruz}/>
            </TouchableOpacity>
            
        </View>
    )
}

const styles=StyleSheet.create(estiloApp);