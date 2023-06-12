import { Text, View } from "react-native";
import PantallaTipoHome from "../componentes/PantallaTipoHome";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Pasos(): JSX.Element{

    return(
        <PantallaTipoHome contenido={
            <View style={{display:'flex',flexDirection:'column',justifyContent:'space-around',alignItems:'center'}}>
                <Text style={{fontSize:25,color:'black',fontWeight:'bold',marginBottom:10}}>Pasos</Text>
                <Text style={{borderRadius:20,borderColor:'black',borderWidth:2,width:300,height:70,marginBottom:10}}></Text>
                <Text style={{fontSize:18,color:'black'}}>Multimedia</Text>
                <View style={{backgroundColor:'white',width:'100%', height:30, bottom:0,alignSelf:'center',zIndex:50,marginTop:500}}>
                        <TouchableOpacity style={{marginTop:6,display:"flex", backgroundColor:'#F0AF23',height:'100%',width:200,minHeight:50,alignSelf:"center", justifyContent:'center', borderRadius: 20}}>
                            <Text style={{alignSelf:"center",fontSize:15,borderRadius:25, justifyContent:"center",position:'absolute'}}>siguiente</Text>
                        </TouchableOpacity>
                </View>

            </View>
        }/>
    )
}