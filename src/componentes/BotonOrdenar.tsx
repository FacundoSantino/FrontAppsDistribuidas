import FotoOrdenar from '../assets/ordenar.png'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image, Text } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import estiloApp from '../estilos/estiloApp';

export default function BotonOrdenar():JSX.Element {
    return (
        <TouchableOpacity style={[{backgroundColor:"#FCB826",borderRadius:15, height:30, width:95},styles.flexRow]}>
            <Image style={{width:19,height:19, marginRight:5}} source={FotoOrdenar}/>
            <Text>Ordenar</Text>
        </TouchableOpacity>
    )
    
}

const styles=StyleSheet.create(estiloApp);