import { TouchableOpacity } from 'react-native-gesture-handler';
import FotoFiltrar from '../assets/filtrar.png';
import { Image, Text } from 'react-native-elements';
import estiloApp from '../estilos/estiloApp';
import { StyleSheet } from 'react-native';

export default function BotonFiltrar():JSX.Element {


    return(
        <TouchableOpacity style={[{backgroundColor:"#FCB826",borderRadius:15, height:30, width:95, justifyContent:"center", alignItems:"center", marginRight:40},styles.flexRow]}>
            <Image style={{width:19,height:19, marginRight:5}} source={FotoFiltrar}/>
            <Text>Filtrar</Text>
        </TouchableOpacity>
    )
}

const styles=StyleSheet.create(estiloApp);