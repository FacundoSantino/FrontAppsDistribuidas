import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import LogoSol from "../assets/Logo_Sol_Bueno.png";
  import estilos from '../estilos/estiloLogin';

type PantallaTipoLoginProps ={
    contenido:JSX.Element;
}

const PantallaTipoLogin=(props:PantallaTipoLoginProps) =>{
    return(
        <View style = {styles.container}>
            
            <View style = {styles.bgHeaderPrincipal}>
            
                <View style = {styles.bgPrincipal}>
                    <Image source={LogoSol}
                        style = {styles.imagen}/>
                    
                    {props.contenido}
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create(estilos);



export default PantallaTipoLogin;