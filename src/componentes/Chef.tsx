import {Image, ImageSourcePropType, View, Text} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type ChefProps ={
    nombre:String,
    imagen:ImageSourcePropType,
    onPress():void,
    ancho:number,
    alto:number,
    color:Color,
}

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;

const ChefProps= (props:ChefProps) =>{
    return(
        <TouchableOpacity onPress={props.onPress} style={{backgroundColor:props.color,borderRadius:20,borderColor:"#000000",borderWidth:1,width:props.ancho,height:props.alto,marginBottom:20}}>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center', justifyContent:'space-around',width:props.ancho,height:props.alto}}>
                <Image source={props.imagen} style={{width:110,height:100, borderRadius:20}}/>
                <Text style={{fontWeight:'bold',fontSize:15}}>{props.nombre}</Text>
            </View>
        </TouchableOpacity>
    )

}

export default ChefProps;