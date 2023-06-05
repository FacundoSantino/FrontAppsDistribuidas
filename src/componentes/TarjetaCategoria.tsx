import {Image, ImageSourcePropType, View, Text} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type TarjetaCategoriaProps ={
    nombre: String;
    onPress(): void;
    sourceFoto: ImageSourcePropType;
    colorInterno: Color;
    colorExterno: Color;
    paddingTop: number;
    paddingBottom:number;
    paddingHorizontal: number;
    ancho:number;
}

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;

const TarjetaCategoria= (props:TarjetaCategoriaProps) =>{
    return(
        <TouchableOpacity style={{backgroundColor:props.colorExterno,paddingTop:props.paddingTop,
            paddingBottom:props.paddingBottom,borderColor:"#000000", borderWidth:1,
            paddingHorizontal:props.paddingHorizontal, borderRadius:20, width:props.ancho,
            marginTop:8,
            }} onPress={(props.onPress)}>

            <View style={{backgroundColor:props.colorInterno,        
                display:"flex",
                flexDirection: "row",
                alignItems:"center",
                borderRadius:15,
                padding:10,
                
                }}>
                
                <Image source={props.sourceFoto} style={{justifyContent:"flex-start",width:72,height:72}} />

                <Text style={{fontSize:24}}> {props.nombre} </Text>

            </View>
            
        </TouchableOpacity>
    )

}

export default TarjetaCategoria;