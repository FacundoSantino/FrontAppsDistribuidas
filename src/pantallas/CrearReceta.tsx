import { View, Text, ScrollView, TouchableOpacity} from "react-native";
import PantallaTipoHome from "../componentes/PantallaTipoHome";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import CajaComensales from "../componentes/CajaComensales";
import CajaPorciones from "../componentes/CajaPorciones";



export default function CrearReceta(){
    const navigation=useNavigation();
    function irAPasosReceta() {
        navigation.navigate("CrearRecetaPaso" as never);
    }
    return(
        <PantallaTipoHome contenido={
            <View style={{display:'flex',flexDirection:'column',justifyContent:'space-around',alignContent:'center',minHeight:300,width:380}}>
                <Text style={{fontWeight:'bold',fontSize:40,color:'black',textAlign:'center',marginBottom:40}}> Crear Receta</Text>
                <Text style={{textAlign:'center',color:'black',fontSize:17 ,marginBottom:15}}>Nombre de la receta</Text>
                <ScrollView contentContainerStyle={{alignItems:'center'}}  style={{borderWidth:2,borderColor:'black',borderRadius:20,height:50 ,width:350,alignSelf:'center',marginBottom:10}}>
                    <TextInput style={{height:50 ,width:340}}></TextInput>
                </ScrollView>
                <Text style={{textAlign:'center',color:'black' ,fontSize:17 ,marginBottom:15}}>Descripcion</Text>
                <ScrollView contentContainerStyle={{alignItems:'center'}}  style={{borderWidth:2,borderColor:'black',borderRadius:20,height:160 ,width:350,alignSelf:'center',marginBottom:20}}>
                    <TextInput textAlignVertical={"top"}
                                textBreakStrategy={"highQuality"}
                                underlineColorAndroid={"transparent"}
                                autoCorrect multiline={true} style={{flex: 1,
                                alignItems: "center",
                                justifyContent: "space-between",
                                paddingHorizontal: 5,
                                marginTop: 10,
                                flexWrap: "wrap",height:160 ,width:340, textAlign:"left"}}></TextInput>
                </ScrollView>
                <Text style={{textAlign:'center',color:'black',fontSize:17 ,marginBottom:15}}>Cantidad de Comensales</Text>
                <CajaComensales 
                    cantidadComensales={1}
                    onChange={(text:number) => {console.log(text)}}    
                />
                <Text style={{textAlign:'center',color:'black',fontSize:17 ,marginBottom:15}}>Cantidad de Porciones</Text>
                <CajaPorciones
                    cantidadPorciones={1}
                    onChange={(text:number) => {console.log(text)}}
                />
                <View style={{backgroundColor:'white',width:'100%', height:5, bottom:0,alignSelf:'center',zIndex:80,marginTop:50}}>
                        <TouchableOpacity onPress={() => irAPasosReceta()}style={{display:"flex", backgroundColor:'#F0AF23',height:'100%',width:200,minHeight:50,alignSelf:"center", justifyContent:'center', borderRadius: 20}}>
                            <Text style={{alignSelf:"center",fontSize:20,borderRadius:25, justifyContent:"center"}}>Siguiente</Text>
                        </TouchableOpacity>
                </View>
            </View> 
        }/>
    )

}