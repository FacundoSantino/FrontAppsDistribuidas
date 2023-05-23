import { Text } from "react-native-elements";
import TarjetaReceta from "../componentes/TarjetaReceta";
import fotoMisRecetas from "../assets/mis_recetas.png";
import PantallaTipoHome from "../componentes/PantallaTipoHome";

function MisRecetas(): JSX.Element{
    return(
        <PantallaTipoHome contenido ={
            <TarjetaReceta
                nombre={'titulo'}
                cantPorciones={2}
                tiempo={60}
                sourceFoto={fotoMisRecetas}
                color={"#FFFDFD"}
                onPress={() => console.log()}
                ancho={353}
                alto={83.06}
            />
    }/>  
    )
}
export default MisRecetas;