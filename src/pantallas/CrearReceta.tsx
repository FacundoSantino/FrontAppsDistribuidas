import { View, Text, ScrollView, TouchableOpacity} from "react-native";
import PantallaTipoHome from "../componentes/PantallaTipoHome";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";




export default function CrearReceta(){
    const navigation=useNavigation();
    function irAPasosReceta() {
        navigation.navigate("CrearRecetaPaso" as never);
    }
    return(
        <PantallaTipoHome contenido={
            <View style={{display:'flex',flexDirection:'column',justifyContent:'space-around',alignContent:'center',minHeight:300,width:380}}>
                <Text style={{fontWeight:'bold',fontSize:40,color:'black',textAlign:'center',marginBottom:50}}> Crear Receta</Text>
                <Text style={{textAlign:'center',color:'black',fontSize:17 ,marginBottom:10}}>Nombre de la receta</Text>
                <ScrollView contentContainerStyle={{alignItems:'center'}}  style={{borderWidth:2,borderColor:'black',borderRadius:20,height:50 ,width:350,alignSelf:'center',marginBottom:10}}>
                    <Text></Text>
                </ScrollView>
                <Text style={{textAlign:'center',color:'black' ,fontSize:17 ,marginBottom:10}}>Descripcion</Text>
                <ScrollView contentContainerStyle={{alignItems:'center'}}  style={{borderWidth:2,borderColor:'black',borderRadius:20,height:290 ,width:350,alignSelf:'center'}}>
                    <Text></Text>
                </ScrollView>
                <View style={{backgroundColor:'white',width:'100%', height:5, bottom:0,alignSelf:'center',zIndex:80,marginTop:150}}>
                        <TouchableOpacity onPress={() => irAPasosReceta()}style={{display:"flex", backgroundColor:'#F0AF23',height:'100%',width:200,minHeight:50,alignSelf:"center", justifyContent:'center', borderRadius: 20}}>
                            <Text style={{alignSelf:"center",fontSize:20,borderRadius:25, justifyContent:"center"}}>Siguiente</Text>
                        </TouchableOpacity>
                </View>
            </View> 
        }/>
    )

}